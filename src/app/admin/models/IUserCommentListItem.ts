export interface IUserCommentListItem {
    id: number;
    userId: number;
    userPhoneNumber: string;
    price: number;
    userCommentStatus: number;
    commentText: string;
    isChosen: boolean;
}