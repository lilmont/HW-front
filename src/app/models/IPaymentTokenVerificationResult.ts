export interface IPaymentTokenVerificationResult {
    code?: number;
    refId?: string;
    cardPan?: string;
}

export class PaymentTokenVerificationResult implements IPaymentTokenVerificationResult {
    code?: number = undefined;
    refId?: string = undefined;
    cardPan?: string = undefined;

    constructor(init?: Partial<PaymentTokenVerificationResult>) {
        Object.assign(this, init);
    }
}