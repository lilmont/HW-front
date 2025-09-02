export interface IDailyReport {
    day: number;
    data: number;
    ids: number[];
}

export interface IMonthlyReportResponse {
    month: number;
    year: number;
    monthName: string;
    total: number;
    dailyReports: IDailyReport[];
}