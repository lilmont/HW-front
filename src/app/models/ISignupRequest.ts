export interface ISignupRequest {
    password: string;
    phoneNumber: string;
}

export class SignupRequest implements ISignupRequest {
    password = '';
    phoneNumber = '';

    constructor(init?: Partial<SignupRequest>) {
        Object.assign(this, init);
    }
}