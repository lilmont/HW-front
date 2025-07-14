export interface IUserCommentListItem {
    id: number;
    userId: number;
    userPhoneNumber: string;
    price: number;
    isApproved: boolean;
    commentText: string;
}