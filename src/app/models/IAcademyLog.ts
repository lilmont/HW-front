export interface IAcademyLog {
    referralUserId: string;
}

export class AcademyLog implements IAcademyLog {
    referralUserId: string = '';
    constructor(init?: Partial<AcademyLog>) {
        Object.assign(this, init);
    }
}