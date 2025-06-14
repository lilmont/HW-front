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
import { DiscountCodesComponent } from './pages/discount-codes/discount-codes.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            { path: '', redirectTo: 'web-course', pathMatch: 'full' },
            { path: 'web-course', component: WebCourseComponent, canActivate: [AuthGuard] },
            { path: 'my-courses', component: UserCoursesComponent, canActivate: [AuthGuard] },
            { path: 'support', component: SupportComponent, canActivate: [AuthGuard] },
            { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },
            { path: 'my-projects', component: UserProjectsComponent, canActivate: [AuthGuard] },
            { path: 'hosting', component: HostingComponent, canActivate: [AuthGuard] },
            { path: 'comments', component: CommentsComponent, canActivate: [AuthGuard] },
            { path: 'user-info', component: UserInfoComponent, canActivate: [AuthGuard] },
            { path: 'discount-codes', component: DiscountCodesComponent, canActivate: [AuthGuard] },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }