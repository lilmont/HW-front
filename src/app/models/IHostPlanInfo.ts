export interface IHostPlanInfo {
    productId: string;
    fullname: string;
    email: string;
}

export class HostPlanInfo implements IHostPlanInfo {
    productId: string;
    fullname: string;
    email: string;
    constructor(productId: string, fullname: string, email: string) {
        this.productId = productId;
        this.fullname = fullname;
        this.email = email;
    }
}