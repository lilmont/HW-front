export interface IPasswordRecovery {
    url: string;
    login: string;
    password: string;
}

export class PasswordRecovery implements IPasswordRecovery {
    url: string = '';
    login: string = '';
    password: string = '';

    constructor(init?: Partial<PasswordRecovery>) {
        Object.assign(this, init);
    }
}