export interface IUserDetail {
    id: number;
    firstName?: string;
    lastName?: string;
    phoneNumber: string;
    email?: string;
    cardNumber?: string;
    biography?: string;
    avatarImage?: string;
    walletBalance: number;
    withdrawableBalance: number;
    isActive: boolean;
    deactivationDescription?: string;
    canAddProject: boolean;
    dateCreated: string;
    downloadCount: number;
    hasExternalHostingPlan: boolean;
}

export class UserDetail implements IUserDetail {
    id: number = 0;
    firstName?: string;
    lastName?: string;
    phoneNumber: string = '';
    email?: string;
    cardNumber?: string;
    biography?: string;
    avatarImage?: string;
    walletBalance: number = 0;
    withdrawableBalance: number = 0;
    isActive: boolean = false;
    deactivationDescription?: string;
    canAddProject: boolean = false;
    dateCreated: string = '';
    downloadCount: number = 0;
    hasExternalHostingPlan: boolean = false;

    constructor(init?: Partial<UserDetail>) {
        Object.assign(this, init);
    }
}
