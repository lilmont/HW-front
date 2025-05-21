export interface IHostPlanInfo {
    productId: number;
    fullname: string;
    email: string;
}

export class HostPlanInfo implements IHostPlanInfo {
    productId: number = 0;
    fullname: string = '';
    email: string = '';
    constructor(init?: Partial<HostPlanInfo>) {
        Object.assign(this, init);
    }
}