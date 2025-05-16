export interface IHostingPlan {
    id: string;
    title: string;
    description: string;
    price: string;
    controlPanelTitle: string;
    serverLocation: string;
    storage: string;
    databaseNumber: string;
    subdomainNumber: string;
    domainNumber: string,
    emailLimit: string,
    supportedTechnologies: string;
    bandwidth: string;
    subscriptionDurationInMonths: string;
}