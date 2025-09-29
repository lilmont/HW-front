export interface IHostingDetail {
    id?: number;
    title: string;
    description: string;
    price: number;
    pleskPlanTitle: string;
    controlPanelTitle: string;
    serverLocation: string;
    storage: string;
    databaseNumber: string;
    subdomainNumber: string;
    domainNumber: string;
    emailLimit: string;
    supportedTechnologies: string;
    bandwidth: string;
    subscriptionDurationInMonths: number;
    isInstallmentAvailable: boolean;
    dateCreated?: string;
    isAffiliate: boolean;
    isPurchasable: boolean;
}

export class HostingDetail implements IHostingDetail {
    id?: number = undefined;
    title: string = '';
    description: string = '';
    price: number = 0;
    pleskPlanTitle: string = '';
    controlPanelTitle: string = '';
    serverLocation: string = '';
    storage: string = '';
    databaseNumber: string = '';
    subdomainNumber: string = '';
    domainNumber: string = '';
    emailLimit: string = '';
    supportedTechnologies: string = '';
    bandwidth: string = '';
    subscriptionDurationInMonths: number = 1;
    isInstallmentAvailable: boolean = false;
    dateCreated?: string;
    isAffiliate: boolean = true;
    isPurchasable: boolean = true;

    constructor(init?: Partial<HostingDetail>) {
        Object.assign(this, init);
    }
}