export interface ICourseQueryParameters {
    pageNumber: number;
    pageSize: number;
}

export class CourseQueryParameters implements ICourseQueryParameters {
    pageNumber = 1;
    pageSize = 10;
    constructor(init?: Partial<CourseQueryParameters>) {
        Object.assign(this, init);
    }
}