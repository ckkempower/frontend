import { Request, Response, Router } from 'express';
import fs from 'fs';
import { nanoid } from 'nanoid';
import { requireAuth } from './utils/requireAuth';
import multer from 'multer';
import { video } from './video';
import { upload } from '../multer/config';
export const file = Router();

const ensureDirectoryExists = (filePath: string) => {
    console.log('PATH: ', filePath);

    const result = fs.mkdirSync(`/usr/app/public/${filePath}`, {
        recursive: true,
    });
    console.log('RESULT: ', result);
};

//
const detectMimeType = (filePath: string): string | null => {
    const signatures: { [key: string]: string } = {
        J: 'pdf',
        R: 'gif',
        i: 'png',
        U: 'webp',
        '/': 'jpg',
    };
    const sig = signatures[filePath.substring(0, 1)];
    if (!sig) return null;
    return sig;
};

export const writeFileSimple = (
    file: NodeJS.ArrayBufferView | string,
    fileName: string
) => {
    try {
        fs.writeFileSync(`/usr/app/public/${fileName}`, file);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const writeFile = (fileData: string, extension: string) => {
    const body = removeHeaderFromBase64(fileData);
    const file = Buffer.from(body, 'base64');
    const fileName = `${nanoid(12)}.${extension}`;
    const success = writeFileSimple(file, fileName);
    if (!success) return '';

    return `/api/file/${fileName}`;
};

const removeHeaderFromBase64 = (base64: string): string => {
    let body = '';
    if (base64.includes(',')) {
        body = base64.split(',')[1];
    } else {
        body = base64;
    }
    return body;
};

const validatePath = (req: Request, res: Response): string | null => {
    const params = req.params as any;
    if (!params.path) {
        res.status(400).json({ message: 'Path is required' });
        return null;
    }

    return params.path;
};

file.get('/:path', (req, res) => {
    const path = validatePath(req, res);
    if (!path) {
        res.status(400).json({ message: 'Path is required' });
        return;
    }
    //make sure file exists
    if (!fs.existsSync(`/usr/app/public/${path}`)) {
        //* Switch to using a 404 page
        res.status(400).json({ message: 'File does not exist' });
        return;
    }
    res.sendFile(path, { root: '/usr/app/public' });
});

file.delete('/:path', (req, res) => {
    const path = validatePath(req, res);
    if (!path) {
        res.status(400).json({ message: 'Path is required' });
        return;
    }
    fs.unlinkSync(`/usr/app/public/${path}`);
    res.json({ message: 'File deleted' });
});

file.post('/', (req, res) => {
    if (!req.body.file) {
        res.status(400).json({ message: 'File is required' });
        return;
    }
    if (!req.body.extension) {
        res.status(400).json({ message: 'Extension is required' });
        return;
    }
    const file = writeFile(req.body.file, req.body.extension);
    if (!file) {
        res.status(400).json({
            message: 'Something went wrong writing the file!',
        });
        return;
    }
    res.json({ file });
});
