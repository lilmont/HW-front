export interface IOrderMessageQueryParameters {
    pageNumber: number;
    pageSize: number;
}

export class OrderMessageQueryParameters implements IOrderMessageQueryParameters {
    pageNumber = 1;
    pageSize = 10;
    constructor(init?: Partial<OrderMessageQueryParameters>) {
        Object.assign(this, init);
    }
}