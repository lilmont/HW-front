import { Messages } from "../../../texts/messages";
import { ISidebarItem } from "../../models/ISidebarItem";

export const SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label: Messages.Headers.userManagement,
        path: '/mazmon/users',
    },
    {
        label: Messages.Headers.courseManagement,
        path: '/mazmon/courses',
    },
    {
        label: Messages.Headers.projectManagement,
        path: '/mazmon/projects',
    },
    {
        label: Messages.Headers.hostManagement,
        path: '/mazmon/hosting',
    },
    {
        label: Messages.Headers.withdrawalRequests,
        path: '/mazmon/withdrawals',
    },
    {
        label: Messages.Headers.discountCodes,
        path: '/mazmon/discount-codes',
    },
    {
        label: Messages.Headers.supportVideos,
        path: '/mazmon/support-videos',
    },
    {
        label: Messages.Headers.userComments,
        path: '/mazmon/user-comments',
    },
    {
        label: Messages.Headers.projectCategories,
        path: '/mazmon/project-categories',
    },
    {
        label: Messages.Headers.supportAnnouncements,
        path: '/mazmon/support-announcements',
    },
    {
        label: Messages.Headers.orderFormMessages,
        path: '/mazmon/order-messages',
    },
    {
        label: Messages.Headers.settings,
        path: '/mazmon/settings',
    },
    {
        label: Messages.Headers.loginCodes,
        path: '/mazmon/login-codes',
    },
];