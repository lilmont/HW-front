export interface ISubmitDomainInfo {
    domain: string;
    productId: string;
}

export class SubmitDomainInfo implements ISubmitDomainInfo {
    domain: string = '';
    productId: string = '';
    constructor(init?: Partial<SubmitDomainInfo>) {
        Object.assign(this, init);
    }
}