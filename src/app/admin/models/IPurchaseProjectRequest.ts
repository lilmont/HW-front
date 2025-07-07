export interface IPurchaseProjectRequest {
    projectId: number;
}

export class PurchaseProjectRequest implements IPurchaseProjectRequest {
    projectId: number = 0;
    constructor(init?: Partial<PurchaseProjectRequest>) {
        Object.assign(this, init);
    }
}