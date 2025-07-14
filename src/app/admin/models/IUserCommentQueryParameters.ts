export interface IUserCommentQueryParameters {
    userId?: number;
    userPhoneNumber?: string;
    isApproved?: boolean;
    pageNumber: number;
    pageSize: number;
}

export class UserCommentQueryParameters implements IUserCommentQueryParameters {
    userId?: number;
    userPhoneNumber?: string;
    isApproved?: boolean;

    pageNumber = 1;
    pageSize = 10;


    constructor(init?: Partial<UserCommentQueryParameters>) {
        Object.assign(this, init);
    }

    reset() {
        this.userId = undefined;
        this.userPhoneNumber = '';
        this.isApproved = undefined;
        this.pageNumber = 1;
        this.pageSize = 10;
    }
}
