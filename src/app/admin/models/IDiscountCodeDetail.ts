export interface IDiscountCodeDetail {
    discountPercentage: number;
    userId: number;
    destinationProductId: number;
}

export class DiscountCodeDetail implements IDiscountCodeDetail {
    discountPercentage: number = 0;
    userId: number = 0;
    destinationProductId: number = 0;

    constructor(init?: Partial<DiscountCodeDetail>) {
        Object.assign(this, init);
    }
}