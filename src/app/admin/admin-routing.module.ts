import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardLayoutComponent } from "./components/dashboard-layout/dashboard-layout.component";
import { AdminAuthGuard } from "./admin-auth.guard";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { UserDetailComponent } from "./pages/user-detail/user-detail.component";
import { CourseListComponent } from "./pages/course-list/course-list.component";
import { CourseDetailComponent } from "./pages/course-detail/course-detail.component";
import { HostListComponent } from "./pages/host-list/host-list.component";
import { HostDetailComponent } from "./pages/host-detail/host-detail.component";
import { ProjectListComponent } from "./pages/project-list/project-list.component";
import { ProjectDetailComponent } from "./pages/project-detail/project-detail.component";
import { WithdrawalListComponent } from "./pages/withdrawal-list/withdrawal-list.component";
import { DiscountCodeListComponent } from "./pages/discount-code-list/discount-code-list.component";
import { DiscountCodeDetailComponent } from "./pages/discount-code-detail/discount-code-detail.component";
import { SupportVideoListComponent } from "./pages/support-video-list/support-video-list.component";
import { SupportVideoDetailComponent } from "./pages/support-video-detail/support-video-detail.component";
import { UserCommentListComponent } from "./pages/user-comment-list/user-comment-list.component";
import { ProjectCategoryListComponent } from "./pages/project-category-list/project-category-list.component";
import { SupportAnnouncementListComponent } from "./pages/support-announcement-list/support-announcement-list.component";
import { OrderFormListComponent } from "./pages/order-form-list/order-form-list.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { LoginCodeListComponent } from "./pages/login-code-list/login-code-list.component";
import { ClearBlockageComponent } from "./pages/clear-blockage/clear-blockage.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent },

    {
        path: '',
        component: DashboardLayoutComponent,
        canActivate: [AdminAuthGuard],
        children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' }, // default dashboard redirect
            { path: 'users', component: UserListComponent },
            { path: 'users/:id', component: UserDetailComponent },

            { path: 'courses', component: CourseListComponent },
            { path: 'courses/course-detail', component: CourseDetailComponent },
            { path: 'courses/course-detail/:id', component: CourseDetailComponent },

            { path: 'projects', component: ProjectListComponent },
            { path: 'projects/project-detail', component: ProjectDetailComponent },
            { path: 'projects/project-detail/:id', component: ProjectDetailComponent },

            { path: 'hosting', component: HostListComponent },
            { path: 'hosting/host-detail', component: HostDetailComponent },
            { path: 'hosting/host-detail/:id', component: HostDetailComponent },

            { path: 'withdrawals', component: WithdrawalListComponent },

            { path: 'discount-codes', component: DiscountCodeListComponent },
            { path: 'discount-codes/code', component: DiscountCodeDetailComponent },

            { path: 'support-videos', component: SupportVideoListComponent },
            { path: 'support-videos/video-detail', component: SupportVideoDetailComponent },
            { path: 'support-videos/video-detail/:id', component: SupportVideoDetailComponent },

            { path: 'user-comments', component: UserCommentListComponent },

            { path: 'project-categories', component: ProjectCategoryListComponent },

            { path: 'support-announcements', component: SupportAnnouncementListComponent },

            { path: 'order-messages', component: OrderFormListComponent },

            { path: 'settings', component: SettingsComponent },

            { path: 'clear-blockage', component: ClearBlockageComponent },

            { path: 'login-codes', component: LoginCodeListComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }