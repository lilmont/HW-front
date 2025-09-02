export interface IDailyIncomeDetailRequest {
    ids: number[];
}

export class DailyIncomeDetailRequest implements IDailyIncomeDetailRequest {
    ids: number[] = [];

    constructor(init?: Partial<DailyIncomeDetailRequest>) {
        Object.assign(this, init);
    }
}