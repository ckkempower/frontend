import multer from 'multer';
import { nanoid } from 'nanoid';

export const storage = multer.diskStorage({
    destination: '/usr/app/public',
    filename: (req, file, cb) => {
        //check if original name has extension
        let extension = file.originalname.split('.').pop();
        if (!extension) {
            extension = req.file?.mimetype.split('/')[1];
        }
        cb(null, `${nanoid()}.${extension || 'mp4'}`);
    },
});
export const upload = multer({ storage });
