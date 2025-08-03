export interface ISendLoginAsUserCodeRequest {
    phoneNumber?: string;
    id?: number;
    code: string;
    password: string;
    referralCode?: string;
}

export class SendLoginAsUserCodeRequest implements ISendLoginAsUserCodeRequest {
    phoneNumber: string = '';
    id?: number;
    code: string = '';
    password: string = '';
    referralCode: string = '';

    constructor(init?: Partial<SendLoginAsUserCodeRequest>) {
        Object.assign(this, init);
    }
}