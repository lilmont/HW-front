export interface IUserProgressResponse {
    id: number;
    fullName: string;
    phoneNumber: string;
    dateCreated: string;
    watchedFirstSessionAt?: string;
    watchedSecondSessionAt?: string;
    watchedThirdSessionAt?: string;
    watchedFourthSessionAt?: string;
    watchedHostVideoAt?: string;
    hostStatus: number;
}