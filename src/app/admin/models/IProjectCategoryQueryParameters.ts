export interface IProjectCategoryQueryParameters {
    pageNumber: number;
    pageSize: number;
}

export class ProjectCategoryQueryParameters implements IProjectCategoryQueryParameters {
    pageNumber = 1;
    pageSize = 10;
    constructor(init?: Partial<ProjectCategoryQueryParameters>) {
        Object.assign(this, init);
    }
}