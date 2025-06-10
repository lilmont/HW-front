export interface IProjectList {
    userProjects: Project[];
    canAddProject: boolean;
    totalProjectCount: number;
    totalPurchaseCount: number;
    totalProjectIncome: number;
}

export class ProjectList implements IProjectList {
    userProjects: Project[] = [];
    canAddProject: boolean = false;
    totalProjectCount: number = 0;
    totalPurchaseCount: number = 0;
    totalProjectIncome: number = 0;
    constructor(init?: Partial<ProjectList>) {
        Object.assign(this, init);
    }
}

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
    totalPurchasedUserShare: number;
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
    totalPurchasedUserShare: number = 0;
    constructor(init?: Partial<Project>) {
        Object.assign(this, init);
    }
}
