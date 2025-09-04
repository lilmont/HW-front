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
import { AddBalanceTutorialComponent } from './components/add-balance-tutorial/add-balance-tutorial.component';
import { HostingCardsComponent } from './components/hosting-cards/hosting-cards.component';
import { CreateHostModalComponent } from './components/create-host-modal/create-host-modal.component';
import { UserHostsTableComponent } from './components/user-hosts-table/user-hosts-table.component';
import { SubmitDomainModalComponent } from './components/submit-domain-modal/submit-domain-modal.component';
import { PasswordModalComponent } from './components/password-modal/password-modal.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { SpotplayerTutorialComponent } from './components/spotplayer-tutorial/spotplayer-tutorial.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { DiscountCodesComponent } from './pages/discount-codes/discount-codes.component';
import { SupportVideosComponent } from './pages/support-videos/support-videos.component';
import { SampleSupportVideosComponent } from './pages/sample-support-videos/sample-support-videos.component';
import { WithdrawCardComponent } from './components/withdraw-card/withdraw-card.component';
import { ReferralComponent } from './pages/referral/referral.component';
import { QRCodeModule } from 'angularx-qrcode';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { PaymentFailedComponent } from './pages/payment-failed/payment-failed.component';
import { HostVideoComponent } from './components/host-video/host-video.component';

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
    AddBalanceTutorialComponent,
    HostingCardsComponent,
    CreateHostModalComponent,
    UserHostsTableComponent,
    SubmitDomainModalComponent,
    PasswordModalComponent,
    CourseCardComponent,
    SpotplayerTutorialComponent,
    ProjectCardComponent,
    DiscountCodesComponent,
    SupportVideosComponent,
    SampleSupportVideosComponent,
    WithdrawCardComponent,
    ReferralComponent,
    PaymentSuccessComponent,
    PaymentFailedComponent,
    HostVideoComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    SharedModule,
    CoreModule,
    QRCodeModule
  ],
  exports: [
    UserHostsTableComponent,
    CourseCardComponent
  ]
})
export class DashboardModule { }
