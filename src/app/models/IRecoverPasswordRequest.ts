export interface IRecoverPasswordRequest {
    productId: number;
}

export class RecoverPasswordRequest implements IRecoverPasswordRequest {
    productId: number = 0;
    constructor(init?: Partial<RecoverPasswordRequest>) {
        Object.assign(this, init);
    }
}