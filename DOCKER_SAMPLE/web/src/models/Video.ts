import type { VideoType } from 'src/shared/types';

export namespace Video {
    export const fetchVideo = async (id: string): Promise<VideoType> => {
        const res = await fetch(`/api/video/${id}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch video with id ${id}`);
        }
        const { video } = await res.json();
        if (!video) {
            throw new Error(`Video with id ${id} not found`);
        }
        return video;
    };
}
