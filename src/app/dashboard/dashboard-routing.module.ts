import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { WebCourseComponent } from './pages/web-course/web-course.component';
import { UserCoursesComponent } from './pages/user-courses/user-courses.component';
import { SupportComponent } from './pages/support/support.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { UserProjectsComponent } from './pages/user-projects/user-projects.component';
import { HostingComponent } from './pages/hosting/hosting.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { AuthGuard } from '../auth/auth.guard';
import { SupportVideosComponent } from './pages/support-videos/support-videos.component';
import { SampleSupportVideosComponent } from './pages/sample-support-videos/sample-support-videos.component';
import { Messages } from '../texts/messages';

const routes: Routes = [
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            { path: '', redirectTo: 'web-course', pathMatch: 'full' },
            { path: 'web-course', component: WebCourseComponent, canActivate: [AuthGuard], data: { title: Messages.Titles.dashboard + ' - ' + Messages.Titles.webCourse } },
            { path: 'my-courses', component: UserCoursesComponent, canActivate: [AuthGuard], data: { title: Messages.Titles.dashboard + ' - ' + Messages.Titles.myCourses } },
            { path: 'support', component: SupportComponent, canActivate: [AuthGuard], data: { title: Messages.Titles.dashboard + ' - ' + Messages.Titles.support } },
            { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard], data: { title: Messages.Titles.dashboard + ' - ' + Messages.Titles.wallet } },
            { path: 'my-projects', component: UserProjectsComponent, canActivate: [AuthGuard], data: { title: Messages.Titles.dashboard + ' - ' + Messages.Titles.myProjects } },
            { path: 'hosting', component: HostingComponent, canActivate: [AuthGuard], data: { title: Messages.Titles.dashboard + ' - ' + Messages.Titles.hosting } },
            { path: 'comments', component: CommentsComponent, canActivate: [AuthGuard], data: { title: Messages.Titles.dashboard + ' - ' + Messages.Titles.comments } },
            { path: 'user-info', component: UserInfoComponent, canActivate: [AuthGuard], data: { title: Messages.Titles.dashboard + ' - ' + Messages.Titles.userInfo } },
            { path: 'support-videos', component: SupportVideosComponent, canActivate: [AuthGuard], data: { title: Messages.Titles.dashboard + ' - ' + Messages.Titles.supportVideos } },
            { path: 'sample-support-videos', component: SampleSupportVideosComponent, canActivate: [AuthGuard], data: { title: Messages.Titles.dashboard + ' - ' + Messages.Titles.sampleSupportVideos } },
            // { path: 'discount-codes', component: DiscountCodesComponent, canActivate: [AuthGuard] },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }