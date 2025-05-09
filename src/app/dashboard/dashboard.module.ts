import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { WebCourseComponent } from './pages/web-course/web-course.component';
import { UserCoursesComponent } from './pages/user-courses/user-courses.component';
import { SupportComponent } from './pages/support/support.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { UserProjectsComponent } from './pages/user-projects/user-projects.component';
import { HostingComponent } from './pages/hosting/hosting.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { AddBalanceComponent } from './components/add-balance/add-balance.component';
import { SubmitReceiptComponent } from './components/submit-receipt/submit-receipt.component';
import { UserTransactionsTableComponent } from './components/user-transactions-table/user-transactions-table.component';
import { WalletCardComponent } from './components/wallet-card/wallet-card.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardHeaderComponent,
    DashboardSidebarComponent,
    WebCourseComponent,
    UserCoursesComponent,
    SupportComponent,
    WalletComponent,
    UserProjectsComponent,
    HostingComponent,
    CommentsComponent,
    UserInfoComponent,
    AddBalanceComponent,
    SubmitReceiptComponent,
    UserTransactionsTableComponent,
    WalletCardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    SharedModule,
    CoreModule
  ]
})
export class DashboardModule { }
