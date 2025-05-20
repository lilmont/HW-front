export interface IRecoverPasswordRequest {
    productId: string;
}

export class RecoverPasswordRequest implements IRecoverPasswordRequest {
    productId: string = '';
    constructor(init?: Partial<RecoverPasswordRequest>) {
        Object.assign(this, init);
    }
}