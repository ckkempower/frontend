import { Router } from 'express';
import { Account } from '../entities/Account';
import { Video } from '../entities/Video';
import { PowerTransaction } from '../entities/PowerTransactions';
import { upload } from '../multer/config';
import { requireAuth } from './utils/requireAuth';
import fs from 'fs';
import { getJWTPayload } from '../utils/parseJWT';
import { transferPower } from '../utils/transferPower';
import { writeFile } from './file';
// import { Vimeo } from 'vimeo';

export const video = Router();

async function uploadVideo(videoPath: string, name: string, description: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        let Vimeo = require('vimeo').Vimeo;
        let client = new Vimeo("8b90f1e5dfaf207daa52e98e5411108aa666cf5e", "7HfaTdP5clUVNJ/LIcGgMe24/orbjvS9JbL671YBG1bpVUn69yFWwGy9ChEOc+JNFDW8+8kCIw0QmjaLCbJnGyoqWqjV1qSibetPEAl92HlFydoFXphgCqETzb2X/+hd", "f16c9a312b9acd05c66fe4e07b6abb89");
        client.upload(
            videoPath,
            { name, description},
            function (uri: string) {
              let url = uri.split('/');
              let newUrl = `https://vimeo.com/${url[url.length-1]}`;
              resolve(newUrl);
            },
            function (bytes_uploaded: number, bytes_total: number) {
              var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2);
              console.log(bytes_uploaded, bytes_total, percentage + '%');
            },
            function (error: string) {
              reject(error);
            }
          );
    });
}

video.post('/', requireAuth, upload.single('file'), async (req, res) => {
    if (!req?.file?.filename) {
        res.status(400).json({ message: 'No file provided' });
        return;
    }
    const id = req.user?.id;

    // const account = await Account.findOne({ where: { id } });
    const account = await Account.findOne({
        where: { id },
        relations: ['group'],
    });

    if (!account) {
        res.status(400).json({
            error: 'Account not found',
        });
        return;
    }
    const power = parseInt(req.body.power);
    if (!power || power <= 0) {
        res.status(400).json({
            error: 'No power provided',
        });
        return;
    }

    if (account.power < power) {
        res.status(400).json({
            error: 'Not enough power',
        });
        return;
    }

    const message = Video.validate(req.body);
    if(message) {
        res.status(400).json({
            message,
        });
        return;
    }

    const video = new Video();
    const { title, description } = req.body;
    let url = await uploadVideo(req.file.path, title, description);

    if (req.body.thumbnail) {
        req.body.thumbnail = typeof req.body.thumbnail == 'string' ? JSON.parse(req.body.thumbnail) : req.body.thumbnail;
        video.thumbnail = writeFile(req.body.thumbnail.file, req.body.thumbnail.extension);
    }

    //remove extension from filename
    const tokens = req.file.filename.split('.');
    tokens.pop();
    const videoId = tokens.join('.');
    video.id = videoId;
    video.groupId = account.group.id;
    video.account = account;
    video.url = url;
    video.title = title;
    video.description = description;
    let [_, err] = transferPower(video.account, video, power);
    if (err != null) console.error(err.message);

    // clamp the value to 0 and the max 32 bit signed integer
    // video.power = Math.min(Math.max(0, power), 2147483647);
    await video.save();
    await video.account.save();

    console.log('DONE UPLOADING');

    res.json({
        video: Video.sanatizePublic(video),
    });
});

// video.put('/:id', requireAuth, async (req, res) => {
//     const id = req.params.id;
//     const video = await Video.findOne({
//         relations: ['account'],
//         where: { id },
//     });
//     if (!video) {
//         res.status(400).json({
//             error: 'Video not found',
//         });
//         return;
//     }
//     const account =  Account.findOne({ where: { id: req.user?.id } });
//     if (!account) {await
//         res.status(400).json({
//             error: 'Account not found',
//         });
//         return;
//     }
//     if (account.id !== video.account.id) {
//         res.status(400).json({
//             error: 'You are not the owner of this video',
//         });
//         return;
//     }
//     const message = Video.validate(req.body);
//     if (message) {
//         fs.unlink(`/usr/app/public/${video.id}`, (err) => {
//             if (err) {
//                 console.log(err);
//             }
//         });
//         res.status(400).json({
//             message,
//         });
//         return;
//     }
//     const { title, description } = req.body;
//     video.title = title;
//     video.description = description;
//     await video.save();
//     res.json({
//         video: Video.sanatizePublic(video),
//     });
// });

video.get('/all', async (req, res) => {
    const videos = await Video.find({
        relations: ['account']
    });
    res.json({
        videos: videos.map(Video.sanatizePublic),
    });
});

video.get('/:id/empower', async (req, res) => {
    const id = req.params.id;
    let videoTrxn: any = await PowerTransaction.find({ where: {userId: id} });
    videoTrxn = await Video.getVideosTransactionByAccount(videoTrxn);
    res.json({
        videos: videoTrxn,
    });
});


video.get('/',requireAuth, async (req, res) => {
    const id = req.user?.id || 0;
    const videos: Video[] = await Video.getVideosWithoutAccount(id);
    res.json({
        videos: videos.map(Video.sanatizePublic),
    });
});

video.get('/me', requireAuth, async (req, res) => {
    const payload = getJWTPayload(req, res);
    if (!payload?.id) {
        res.json({
            message: 'No user found',
            success: false,
        });
        return;
    }
    const videos = await Video.getVideosByAccount(payload.id);
    res.json({
        videos: videos.map(Video.sanatizePublic),
        success: true,
    });
});

video.get('/:id', async (req, res) => {
    const id = req.params.id;
    const video = await Video.findOne({
        relations: ['account'],
        where: { id },
    });
    if (!video) {
        res.status(400).json({
            error: 'Video not found',
        });
        return;
    }
    res.json({
        video: Video.sanatizePublic(video),
    });
});


video.post('/addPowerToVideo', requireAuth, async (req, res) => {
    const id = req.user?.id;

    const account = await Account.findOne({ where: { id } });
      if (!account) {
        res.status(400).json({
            error: 'Account not found',
        });
        return;
    }
    
    const message = Video.validatPowerAPI(req.body);
    if(message) {
        res.status(400).json({
            message,
        });
        return;
    }
    const power = parseInt(req.body.power);
    if (account.power < power) {
        res.status(400).json({
            error: 'Not enough power',
        });
        return;
    }

    let video: any = await Video.findOne({ where: { id: req.body.videoId }, relations: ['account'] });
    account.power -= power;
    video.power += power;
    await account.save();
    video = await video.save();
    const powerTransaction = new PowerTransaction();
    powerTransaction.userId = account.id;
    powerTransaction.videoId = video.id;
    powerTransaction.powerTranferred = power;
    powerTransaction.thumbnail = video.thumbnail;
    powerTransaction.url = video.url;
    powerTransaction.type = 'addPowerToVideo';
    await powerTransaction.save();
    res.json({
        video: Video.sanatizePublic(video),
    });
});

video.post('/addPowerToAccount', requireAuth, async (req, res) => {
    const id = req.user?.id;

    let account: any = await Account.findOne({ where: { id } });
      if (!account) {
        res.status(400).json({
            error: 'Account not found',
        });
        return;
    }
    
    const message = Video.validatPowerAPI(req.body);
    if(message) {
        res.status(400).json({
            message,
        });
        return;
    }
    const power = parseInt(req.body.power);
    const video: any = await Video.findOne({ where: { id: req.body.videoId } });
    if ((video.power < power) || (video.power <= video.powerTransferred)) {
        res.status(400).json({
            error: 'Not enough power',
        });
        return;
    }
    

    video.power -= power;
    account.power += power;
    account = await account.save();
    video.powerTransferred += power;
    await video.save();
    const powerTransaction = new PowerTransaction();
    powerTransaction.userId = account.id;
    powerTransaction.videoId = video.id;
    powerTransaction.powerTranferred = power;
    powerTransaction.type = 'addPowerToAccount';
    powerTransaction.thumbnail = video.thumbnail;
    powerTransaction.url = video.url;
    await powerTransaction.save();    
    res.json({
        account: Account.sanatizePublic(account),
    });
});