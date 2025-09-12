export interface IUpgradeRequiredBalanceRequest {
    productId: number;
    targetHostingPlanId: number | null;
}

export class UpgradeRequiredBalanceRequest implements IUpgradeRequiredBalanceRequest {
    productId: number = 0;
    targetHostingPlanId: number | null = null;
    constructor(init?: Partial<UpgradeRequiredBalanceRequest>) {
        Object.assign(this, init);
    }
}