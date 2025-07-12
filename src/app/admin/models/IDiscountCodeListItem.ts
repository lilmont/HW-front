export interface IDiscountCodeListItem {
    id: number;
    userId: number;
    userPhoneNumber: string;
    discountPercentage: number;
    productName: string;
    isUsed: boolean;
    usedAt: string;
    createdBy: string;
}