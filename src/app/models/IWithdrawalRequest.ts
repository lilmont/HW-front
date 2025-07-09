export interface IWithdrawalRequest {
    withdrawAmount: number;
}

export class WithdrawalRequest implements IWithdrawalRequest {
    withdrawAmount: number = 0;

    constructor(init?: Partial<WithdrawalRequest>) {
        Object.assign(this, init);
    }
}