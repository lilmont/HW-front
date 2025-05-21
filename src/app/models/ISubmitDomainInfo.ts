export interface ISubmitDomainInfo {
    domain: string;
    productId: number;
}

export class SubmitDomainInfo implements ISubmitDomainInfo {
    domain: string = '';
    productId: number = 0;
    constructor(init?: Partial<SubmitDomainInfo>) {
        Object.assign(this, init);
    }
}