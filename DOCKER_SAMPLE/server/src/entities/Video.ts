import {
    BaseEntity,
    Entity,
    Column,
    CreateDateColumn,
    ManyToOne,
    PrimaryColumn,
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

    @Column({ default: 0 })
    power!: number;

    @ManyToOne(() => Account)
    account!: Account;

    @CreateDateColumn()
    createdAt!: Date;

    static validate(video: Video): string | null {
        if (!video.title) return 'Title is required';
        if (!video.description) return 'Description is required';
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
        });
    }
}
