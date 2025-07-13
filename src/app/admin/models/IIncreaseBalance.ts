export interface IIncreaseBalance {
    userId: number;
    amount: number;
}

export class IncreaseBalance implements IIncreaseBalance {
    userId: number = 0;
    amount: number = 0;
    constructor(init?: Partial<IncreaseBalance>) {
        Object.assign(this, init);
    }

    reset() {
        this.userId = 0;
        this.amount = 0;
    }
}