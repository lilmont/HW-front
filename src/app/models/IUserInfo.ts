export interface IUserInfo {
    firstName: string;
    lastName: string;
    email: string;
    cardNumber: string;
    biography: string;
}

export class UserInfo implements IUserInfo {
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    cardNumber: string = '';
    biography: string = '';
    constructor(init?: Partial<UserInfo>) {
        Object.assign(this, init);
    }
}