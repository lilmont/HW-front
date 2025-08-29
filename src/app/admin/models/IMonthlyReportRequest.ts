export interface IMonthlyReportRequest {
    month: number;
    year: number;
}

export class MonthlyReportRequest implements IMonthlyReportRequest {
    month: number = 1;
    year: number = 1404;
    constructor(init?: Partial<MonthlyReportRequest>) {
        Object.assign(this, init);
    }
}