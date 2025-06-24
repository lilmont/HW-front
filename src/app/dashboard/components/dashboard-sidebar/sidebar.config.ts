import { ISidebarItem } from '../../../models/ISidebarItem';
import { CommentIconComponent } from '../../../shared/svg-icons/comment-icon/comment-icon.component';
import { CoursesIconComponent } from '../../../shared/svg-icons/courses-icon/courses-icon.component';
import { HostIconComponent } from '../../../shared/svg-icons/host-icon/host-icon.component';
import { ProfileIconComponent } from '../../../shared/svg-icons/profile-icon/profile-icon.component';
import { ProjectIconComponent } from '../../../shared/svg-icons/project-icon/project-icon.component';
import { SupportIconComponent } from '../../../shared/svg-icons/support-icon/support-icon.component';
import { VideoChatIconComponent } from '../../../shared/svg-icons/video-chat-icon/video-chat-icon.component';
import { VideoIconComponent } from '../../../shared/svg-icons/video-icon/video-icon.component';
import { WalletIconComponent } from '../../../shared/svg-icons/wallet-icon/wallet-icon.component';
import { WebCourseIconComponent } from '../../../shared/svg-icons/web-course-icon/web-course-icon.component';
import { Messages } from '../../../texts/messages';

export const SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label: Messages.Headers.webCourse,
        path: '/dashboard/web-course',
        svgComponent: WebCourseIconComponent,
    },
    {
        label: Messages.Headers.myCourses,
        path: '/dashboard/my-courses',
        svgComponent: CoursesIconComponent,
    },
    {
        label: Messages.Headers.wallet,
        path: '/dashboard/wallet',
        svgComponent: WalletIconComponent,
    },
    {
        label: Messages.Headers.support,
        path: '/dashboard/support',
        svgComponent: SupportIconComponent,
    },
    {
        label: Messages.Headers.supportVideos,
        path: '/dashboard/support-videos',
        svgComponent: VideoIconComponent,
    },
    {
        label: Messages.Headers.sampleSupport,
        path: '/dashboard/sample-support-videos',
        svgComponent: VideoIconComponent,
    },
    {
        label: Messages.Headers.hosting,
        path: '/dashboard/hosting',
        svgComponent: HostIconComponent,
    },
    {
        label: Messages.Headers.myProjects,
        path: '/dashboard/my-projects',
        svgComponent: ProjectIconComponent,
    },
    {
        label: Messages.Headers.personalInfo,
        path: '/dashboard/user-info',
        svgComponent: ProfileIconComponent,
    },
    {
        label: Messages.Headers.comments,
        path: '/dashboard/comments',
        svgComponent: CommentIconComponent,
    },
    // {
    //     label: Messages.Headers.discountCodes,
    //     path: '/dashboard/discount-codes',
    //     svgComponent: DiscountIconComponent,
    // }
];
