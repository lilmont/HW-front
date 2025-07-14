export interface IProjectCategoryListItem {
    id?: number;
    title: string;
}

export class ProjectCategoryListItem implements IProjectCategoryListItem {
    id?: number = undefined;
    title: string = '';
    constructor(init?: Partial<ProjectCategoryListItem>) {
        Object.assign(this, init);
    }
}