export interface IHostQueryParameters {
    pageNumber: number;
    pageSize: number;
}

export class HostQueryParameters implements IHostQueryParameters {
    pageNumber = 1;
    pageSize = 10;
    constructor(init?: Partial<HostQueryParameters>) {
        Object.assign(this, init);
    }
}