export interface ISupportVideoDetail {
    id?: number;
    title: string;
    video: string;
    videoType: number;
}

export class SupportVideoDetail implements ISupportVideoDetail {
    id?: number = undefined;
    title: string = '';
    video: string = '';
    videoType: number = 0;

    constructor(init?: Partial<SupportVideoDetail>) {
        Object.assign(this, init);
    }
}
