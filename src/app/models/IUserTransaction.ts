export interface IUserTransaction {
    price: number;
    transactionDate: string;
    transactionType: number;
    isCredit: boolean;
    balance: number;
    title: string;
}