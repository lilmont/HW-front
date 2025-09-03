export interface ITransferBalanceRequest {
    userId: number;
    taxPercentage: number;
}

export class TransferBalanceRequest implements ITransferBalanceRequest {
    userId: number = 0;
    taxPercentage: number = 10;

    constructor(init?: Partial<TransferBalanceRequest>) {
        Object.assign(this, init);
    }
}