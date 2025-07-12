export interface IWithdrawalRequestListItem {
    id: number;
    userId: number;
    userPhoneNumber: string;
    amount: number;
    dateRequested: string;
    withdrawalRequestStatus: number;
}