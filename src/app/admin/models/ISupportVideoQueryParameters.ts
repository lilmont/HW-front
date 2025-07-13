export interface ISupportVideoQueryParameters {
    pageNumber: number;
    pageSize: number;
}

export class SupportVideoQueryParameters implements ISupportVideoQueryParameters {
    pageNumber = 1;
    pageSize = 10;
    constructor(init?: Partial<SupportVideoQueryParameters>) {
        Object.assign(this, init);
    }
}