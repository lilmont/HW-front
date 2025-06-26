import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { LoginComponent } from './pages/login/login.component';



@NgModule({
  declarations: [
    DashboardHeaderComponent,
    DashboardSidebarComponent,
    DashboardLayoutComponent,
    UserListComponent,
    LoginComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
