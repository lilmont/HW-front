export interface ISupportVideoDetail {
    id?: number;
    title: string;
    video: string;
}

export class SupportVideoDetail implements ISupportVideoDetail {
    id?: number = undefined;
    title: string = '';
    video: string = '';

    constructor(init?: Partial<SupportVideoDetail>) {
        Object.assign(this, init);
    }
}
