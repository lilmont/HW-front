export interface IUserBalance {
    withdrawableBalance: number;
    pendingWithdrawalAmount: number;
    withdrawanAmount: number;
}

export class UserBalance implements IUserBalance {
    withdrawableBalance: number = 0;
    pendingWithdrawalAmount: number = 0;
    withdrawanAmount: number = 0;
    constructor(init?: Partial<UserBalance>) {
        Object.assign(this, init);
    }
}