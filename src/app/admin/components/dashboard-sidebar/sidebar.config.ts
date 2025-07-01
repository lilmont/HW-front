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
];