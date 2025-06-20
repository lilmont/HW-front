export interface ICourseDetail {
    id: number;
    title: string;
    description: string;
    fullDescription: string;
    syllabus: string;
    courseImage: string;
    courseVideo: string;
    courseStatus: number;
    courseSessionNumber: number;
    courseDurationInHours: number;
    price: number;
    hasDiscountCode: boolean;
    discountPercentage: number;
    discountedPrice: number;
}