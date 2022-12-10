import { Router } from 'express';
import { Account } from '../entities/Account';
import { Video } from '../entities/Video';
import { upload } from '../multer/config';
import { requireAuth } from './utils/requireAuth';
import fs from 'fs';
import { getJWTPayload } from '../utils/parseJWT';
import { transferPower } from '../utils/transferPower';
export const video = Router();

video.post('/', requireAuth, upload.single('file'), async (req, res) => {
    if (!req?.file?.filename) {
        res.status(400).json({ message: 'No file provided' });
        return;
    }
    const url = `/api/file/${req?.file?.filename}`;

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

    const video = new Video();
    //remove extension from filename
    const tokens = req.file.filename.split('.');
    tokens.pop();
    const videoId = tokens.join('.');
    video.id = videoId;
    video.groupId = account.group.id;
    video.account = account;
    video.url = url;
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

video.put('/:id', requireAuth, async (req, res) => {
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
    const account = await Account.findOne({ where: { id: req.user?.id } });
    if (!account) {
        res.status(400).json({
            error: 'Account not found',
        });
        return;
    }
    if (account.id !== video.account.id) {
        res.status(400).json({
            error: 'You are not the owner of this video',
        });
        return;
    }
    const message = Video.validate(req.body);
    if (message) {
        fs.unlink(`/usr/app/public/${video.id}`, (err) => {
            if (err) {
                console.log(err);
            }
        });
        res.status(400).json({
            message,
        });
        return;
    }
    const { title, description } = req.body;
    video.title = title;
    video.description = description;
    await video.save();
    res.json({
        video: Video.sanatizePublic(video),
    });
});

video.get('/', async (req, res) => {
    const videos = await Video.find();
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
