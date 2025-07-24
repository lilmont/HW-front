export interface IUserQueryParameters {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    id?: string;
    domain?: string;
    isActive?: boolean;
    pageNumber: number;
    pageSize: number;
    isContactAdded?: boolean;
}

export class UserQueryParameters implements IUserQueryParameters {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    id?: string;
    domain?: string;
    isActive?: boolean;
    isContactAdded?: boolean;

    pageNumber = 1;
    pageSize = 10;


    constructor(init?: Partial<UserQueryParameters>) {
        Object.assign(this, init);
    }

    reset() {
        this.firstName = '';
        this.lastName = '';
        this.phoneNumber = '';
        this.id = '';
        this.domain = '';
        this.isActive = undefined;
        this.isContactAdded = undefined;
        this.pageNumber = 1;
        this.pageSize = 10;
    }
}
