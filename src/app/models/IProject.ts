export interface IProject {
    id?: number;
    title: string;
    description: string;
    previewLink: string;
    downloadLink: string;
    projectImage: string;
    price: number;
    projectStatus: number;
    isShown: boolean;
    purchasedCount: number;
    totalPurchased: number;
}

export class Project implements IProject {
    id?: number = undefined;
    title: string = '';
    description: string = '';
    previewLink: string = '';
    downloadLink: string = '';
    projectImage: string = '';
    price: number = 0;
    projectStatus: number = 0;
    isShown: boolean = false;
    purchasedCount: number = 0;
    totalPurchased: number = 0;
    constructor(init?: Partial<Project>) {
        Object.assign(this, init);
    }
}
