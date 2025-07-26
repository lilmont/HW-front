export interface ILoginCodeListItem {
    code: string;
    phoneNumber: string;
    dateCreated: string;
}

export class LoginCodeListItem implements ILoginCodeListItem {
    code: string = '';
    phoneNumber: string = '';
    dateCreated: string = '';
    constructor(init?: Partial<LoginCodeListItem>) {
        Object.assign(this, init);
    }
}