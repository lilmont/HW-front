export interface ISendLoginCodeRequest {
    emailAddress: string;
    code: string;
}

export class SendLoginCodeRequest implements ISendLoginCodeRequest {
    emailAddress: string = '';
    code: string = '';

    constructor(init?: Partial<SendLoginCodeRequest>) {
        Object.assign(this, init);
    }
}