export interface IOption {
    id: number;
    title: string;
}

export class Option implements IOption {
    id: number = 0;
    title: string = '';

    constructor(init?: Partial<Option>) {
        Object.assign(this, init);
    }
}