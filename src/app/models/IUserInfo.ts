import { IJwtResponse } from "./IJwtResponse";

export interface IUserInfo {
    firstName?: string;
    lastName?: string;
    email?: string;
    cardNumber?: string;
    biography?: string;
    avatarImage?: string;
}

export class UserInfo implements IUserInfo {
    firstName?: string = '';
    lastName?: string = '';
    email?: string = '';
    cardNumber?: string = '';
    biography?: string = '';
    avatarImage?: string = '';
    constructor(init?: Partial<UserInfo>) {
        Object.assign(this, init);
    }
}

export interface IUserAvatarUpdateResponse {
    fileName: string;
    JwtResponse: IJwtResponse;
}