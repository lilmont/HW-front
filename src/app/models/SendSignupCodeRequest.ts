export interface ISendSignupCodeRequest {
    phoneNumber: string;
    code: string;
    password: string;
}

export class SendSignupCodeRequest implements ISendSignupCodeRequest {
    phoneNumber: string = '';
    code: string = '';
    password: string = '';

    constructor(init?: Partial<SendSignupCodeRequest>) {
        Object.assign(this, init);
    }
}