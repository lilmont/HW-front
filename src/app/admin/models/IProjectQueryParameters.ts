export interface IProjectQueryParameters {
    userId?: number;
    userPhoneNumber?: string;
    pageNumber: number;
    pageSize: number;
}

export class ProjectQueryParameters implements IProjectQueryParameters {
    userId?: number;
    userPhoneNumber?: string;

    pageNumber = 1;
    pageSize = 10;


    constructor(init?: Partial<ProjectQueryParameters>) {
        Object.assign(this, init);
    }

    reset() {
        this.userId = undefined;
        this.userPhoneNumber = '';
        this.pageNumber = 1;
        this.pageSize = 10;
    }
}
