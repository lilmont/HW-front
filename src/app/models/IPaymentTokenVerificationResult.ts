export interface IPaymentTokenVerificationResult {
    code?: number;
    refId?: number;
    cardPan?: string;
}

export class PaymentTokenVerificationResult implements IPaymentTokenVerificationResult {
    code?: number = undefined;
    refId?: number = undefined;
    cardPan?: string = undefined;

    constructor(init?: Partial<PaymentTokenVerificationResult>) {
        Object.assign(this, init);
    }
}