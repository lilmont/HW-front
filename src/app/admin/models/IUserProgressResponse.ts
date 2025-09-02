export interface IUserProgressResponse {
    id: number;
    fullName: string;
    phoneNumber: string;
    dateCreated: string;
    watchedFirstSessionAt?: string;
    WatchedSecondSessionAt?: string;
    WatchedThirdSessionAt?: string;
    WatchedFourthSessionAt?: string;
    WatchedHostVideoAt?: string;
    hostStatus: number;
}