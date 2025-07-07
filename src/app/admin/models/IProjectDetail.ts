export interface IProjectDetail {
    id?: number;
    title: string;
    description: string;
    previewLink: string;
    downloadLink: string;
    projectImage: string;
    price: number;
    projectStatus?: number;
    isShown: boolean;
    purchasedCount: number;
    totalPurchased: number;
    userPercentage: number;
    userShareOfTotalPurchased: number;
    projectCategoryId?: number;
    dateCreated?: string;
    confirmDate?: string;
    userId?: number;
    userPhoneNumber?: string;
}

export class ProjectDetail implements IProjectDetail {
    id?: number = undefined;
    title: string = '';
    description: string = '';
    price: number = 0;
    previewLink: string = '';
    downloadLink: string = '';
    projectImage: string = '';
    projectStatus?: number = undefined;
    isShown: boolean = false;
    purchasedCount: number = 0;
    totalPurchased: number = 0;
    userPercentage: number = 0;
    userShareOfTotalPurchased: number = 0;
    projectCategoryId?: number = undefined;
    dateCreated?: string = undefined;
    confirmDate?: string = undefined;
    userId?: number = undefined;
    userPhoneNumber?: string = undefined;

    constructor(init?: Partial<ProjectDetail>) {
        Object.assign(this, init);
    }
}