import {
    BaseEntity,
    Entity,
    Column,
    CreateDateColumn,
    ManyToOne,
    PrimaryColumn,
    Not
} from 'typeorm';
import { AccountType, VideoType } from '../shared/types';
import { Account } from './Account';

@Entity()
export class Video extends BaseEntity implements VideoType {
    @PrimaryColumn()
    id!: string;

    @Column()
    url!: string;

    @Column()
    groupId!: number;

    @Column({ nullable: true })
    title!: string;

    @Column({ nullable: true })
    description!: string;

    @Column({ nullable: true })
    thumbnail!: string;

    @Column({ default: 0 })
    power!: number;

    @Column({ default: 0 })
    powerTransferred!: number;

    @ManyToOne(() => Account)
    account!: Account;

    @CreateDateColumn()
    createdAt!: Date;

    static validate(video: Video): string | null {
        if (!video.title) return 'Title is required';
        if (!video.description) return 'Description is required';
        return null;
    }

    static validatPowerAPI(body: any): string | null {
        if (!body.power) return 'Power is required';
        if (!body.videoId) return 'Video Id is required';
        return null;
    }

    static sanatizePublic(video: Video): VideoType {
        const copy = { ...video } as VideoType;
        copy.account = Account.sanatizePublic(video.account);
        return copy;
    }

    static async createVideo(v: VideoType): Promise<Video> {
        const video = new Video();
        video.account = v.account as Account;
        video.url = v.url;
        video.title = v.title;
        video.description = v.description;
        await video.save();
        return video;
    }

    static async getVideosByAccount(accountId: number): Promise<Video[]> {
        return await Video.find({
            where: { account: { id: accountId } },
            relations: ['account']
        });
    }

    static async getVideosWithoutAccount(accountId: number): Promise<Video[]> {
        return await Video.find({
            where: { account: { id: Not(accountId) } },
            relations: ['account']
        });
    }

    static async getVideosTransactionByAccount(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const result = Object.values(data.reduce((r: any, o: any) => (r[o.videoId]
                ? (r[o.videoId].powerTranferred += o.powerTranferred)
                : (r[o.videoId] = {...o}), r), {}));
            resolve(result);
        });
    }
  
}
