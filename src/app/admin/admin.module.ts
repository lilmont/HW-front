import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { CoreModule } from '../core/core.module';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { SharedModule } from '../shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { HostListComponent } from './pages/host-list/host-list.component';
import { HostDetailComponent } from './pages/host-detail/host-detail.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { WithdrawalListComponent } from './pages/withdrawal-list/withdrawal-list.component';
import { DiscountCodeListComponent } from './pages/discount-code-list/discount-code-list.component';
import { DiscountCodeDetailComponent } from './pages/discount-code-detail/discount-code-detail.component';
import { SupportVideoListComponent } from './pages/support-video-list/support-video-list.component';
import { SupportVideoDetailComponent } from './pages/support-video-detail/support-video-detail.component';


@NgModule({
  declarations: [
    DashboardHeaderComponent,
    DashboardSidebarComponent,
    DashboardLayoutComponent,
    UserListComponent,
    LoginComponent,
    PaginationComponent,
    UserDetailComponent,
    CourseListComponent,
    CourseDetailComponent,
    HostListComponent,
    HostDetailComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    WithdrawalListComponent,
    DiscountCodeListComponent,
    DiscountCodeDetailComponent,
    SupportVideoListComponent,
    SupportVideoDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    RouterModule,
    CoreModule,
    SharedModule,
    QuillModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
