import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { CoreModule } from '../core/core.module';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { SharedModule } from '../shared/shared.module';



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
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    RouterModule,
    CoreModule,
    SharedModule
  ]
})
export class AdminModule { }
