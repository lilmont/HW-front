export interface IRejectWithdrawalRequest {
    id: number;
}

export class RejectWithdrawalRequest implements IRejectWithdrawalRequest {
    id: number = 0;
    constructor(init?: Partial<RejectWithdrawalRequest>) {
        Object.assign(this, init);
    }
}