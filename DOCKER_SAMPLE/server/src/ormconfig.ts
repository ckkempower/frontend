import { createConnection } from 'typeorm';
import { Account } from './entities/Account';
import { Group } from './entities/Group';
import { Video } from './entities/Video';
import { PowerTransaction } from './entities/PowerTransactions';


export default {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    synchronize: true, //? probably should comment out in production
    // logging: true, //? turn on if you wanna look at sql
    entities: [Account, Group, Video, PowerTransaction],
} as Parameters<typeof createConnection>[0];
