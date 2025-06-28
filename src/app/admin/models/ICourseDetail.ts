export interface ICourseDetail {
    id?: number;
    title: string;
    description: string;
    price: number;
    courseSessionNumber: number;
    courseDurationInHours: number;
    courseImage: string;
    courseCoverImage: string;
    courseVideo: string;
    fullDescription: string;
    syllabus: string;
    spotPlayerProductId: string
    courseStatus: number;
    dateCreated?: string;
    sessions: ICourseSession[];
}

export class CourseDetail implements ICourseDetail {
    id?: number = undefined;
    title: string = '';
    description: string = '';
    price: number = 0;
    courseSessionNumber: number = 0;
    courseDurationInHours: number = 0;
    courseImage: string = '';
    courseCoverImage: string = '';
    courseVideo: string = '';
    fullDescription: string = '';
    syllabus: string = '';
    spotPlayerProductId: string = '';
    courseStatus: number = 0;
    dateCreated?: string = undefined;
    sessions: ICourseSession[] = [];

    constructor(init?: Partial<CourseDetail>) {
        Object.assign(this, init);
    }
}

export interface ICourseSession {
    id?: number;
    title: string;
    description: string;
    number: number;
    downloadLink: string;
}

export class CourseSession implements ICourseSession {
    id?: number = undefined;
    title: string = '';
    description: string = '';
    number: number = 0;
    downloadLink: string = '';

    constructor(init?: Partial<CourseSession>) {
        Object.assign(this, init);
    }
}