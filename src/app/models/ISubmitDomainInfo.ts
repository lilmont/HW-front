export interface ISubmitDomainInfo {
    domain: string;
    productId: number;
    isFreeDomain: boolean;
}

export class SubmitDomainInfo implements ISubmitDomainInfo {
    domain: string = '';
    productId: number = 0;
    isFreeDomain: boolean = false;
    constructor(init?: Partial<SubmitDomainInfo>) {
        Object.assign(this, init);
    }
}