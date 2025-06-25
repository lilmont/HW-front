export interface IValidationError {
    field: string;
    code: string;
    message: string;
}

export interface IServiceResponse<T> {
    isSuccess: boolean;
    data: T | null;
    errors: IValidationError[];
}