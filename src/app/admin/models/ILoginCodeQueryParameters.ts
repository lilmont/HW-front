export interface ILoginCodeQueryParameters {
    pageNumber: number;
    pageSize: number;
}

export class LoginCodeQueryParameters implements ILoginCodeQueryParameters {
    pageNumber = 1;
    pageSize = 10;
    constructor(init?: Partial<LoginCodeQueryParameters>) {
        Object.assign(this, init);
    }
}