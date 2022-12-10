import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { createConnection, getManager, getRepository } from 'typeorm';
import { Account } from './entities/Account';
import { Group } from './entities/Group';
import { upload } from './multer/config';
import ormconfig from './ormconfig';
import { router } from './routes';
declare global {
    namespace Express {
        interface User {
            id: number;
            iat: number;
        }
    }
}
const main = async () => {
    //Attempt to create typeORM connection to db
    try {
        await createConnection(ormconfig);
    } catch (e) {
        console.log('ERROR CONNECTING TO DATABASE: \n', e);
    }

    //Basic express setup
    const app = express();
    app.use(
        express.json({
            limit: '512mb',
        }),
        cors({
            origin:
                process.env.NODE_ENV !== 'production'
                    ? '*'
                    : 'http://localhost',
            credentials: true,
        })
    );

    app.use('/', router);

    const httpServer = createServer(app);

    httpServer.listen(4000, () => {
        console.log('server started at http://localhost:4000');
    });
};

try {
    main();
} catch (e) {
    console.log(e);
}
