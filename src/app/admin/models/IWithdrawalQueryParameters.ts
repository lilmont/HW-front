export interface IWithdrawalQueryParameters {
    userId?: number;
    userPhoneNumber?: string;
    pageNumber: number;
    pageSize: number;
}

export class WithdrawalQueryParameters implements IWithdrawalQueryParameters {
    userId?: number;
    userPhoneNumber?: string;

    pageNumber = 1;
    pageSize = 10;


    constructor(init?: Partial<WithdrawalQueryParameters>) {
        Object.assign(this, init);
    }

    reset() {
        this.userId = undefined;
        this.userPhoneNumber = '';
        this.pageNumber = 1;
        this.pageSize = 10;
    }
}