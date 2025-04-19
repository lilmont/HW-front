export interface ISendSignupCodeRequest {
    phoneNumber: string;
}

export class SendSignupCodeRequest implements ISendSignupCodeRequest {
    phoneNumber = '';

    constructor(init?: Partial<SendSignupCodeRequest>) {
        Object.assign(this, init);
    }
}