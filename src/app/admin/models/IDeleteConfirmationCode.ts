export interface IDeleteConfirmationCode {
    id: number;
}

export class DeleteConfirmationCode implements IDeleteConfirmationCode {
    id: number = 0;
    constructor(init?: Partial<DeleteConfirmationCode>) {
        Object.assign(this, init);
    }
}