export interface ICheckDiscountCodeRequest {
    productId: number;
    code: string;
}

export class CheckDiscountCodeRequest implements ICheckDiscountCodeRequest {
    productId: number = 0;
    code: string = '';
    constructor(init?: Partial<CheckDiscountCodeRequest>) {
        Object.assign(this, init);
    }
}