import express from 'express';
import { account } from './account';
import { file } from './file';
import { video } from './video';
export const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Hello World!',
    });
});

router.use('/account', account);
router.use('/file', file);
router.use('/video', video);
