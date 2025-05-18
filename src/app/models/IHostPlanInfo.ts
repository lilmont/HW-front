export interface IHostPlanInfo {
    productId: string;
    fullname: string;
    email: string;
}

export class HostPlanInfo implements IHostPlanInfo {
    productId: string = '';
    fullname: string = '';
    email: string = '';
    constructor(init?: Partial<HostPlanInfo>) {
        Object.assign(this, init);
    }
}