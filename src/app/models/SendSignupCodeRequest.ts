export interface ISendSignupCodeRequest {
    phoneNumber: string;
    code: string;
}

export class SendSignupCodeRequest implements ISendSignupCodeRequest {
    phoneNumber: string = '';
    code: string = '';

    constructor(init?: Partial<SendSignupCodeRequest>) {
        Object.assign(this, init);
    }
}