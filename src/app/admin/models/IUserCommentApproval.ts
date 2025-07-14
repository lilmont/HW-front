export interface IUserCommentApproval {
    id: number;
}

export class UserCommentApproval implements IUserCommentApproval {
    id: number = 0;
    constructor(init?: Partial<UserCommentApproval>) {
        Object.assign(this, init);
    }
}