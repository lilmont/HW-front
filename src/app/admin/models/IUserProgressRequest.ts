export interface IUserProgressRequest {
    ids: number[];
}

export class UserProgressRequest implements IUserProgressRequest {
    ids: number[] = [];

    constructor(init?: Partial<UserProgressRequest>) {
        Object.assign(this, init);
    }
}