import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CardComponent } from './components/card/card.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { TextDividerComponent } from './components/text-divider/text-divider.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { CardCarouselComponent } from './components/card-carousel/card-carousel.component';
import { TestimonialCardComponent } from './components/testimonial-card/testimonial-card.component';
import { FilteredCardsComponent } from './components/filtered-cards/filtered-cards.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { FormsModule } from '@angular/forms';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { WebCourseIconComponent } from './svg-icons/web-course-icon/web-course-icon.component';
import { CoursesIconComponent } from './svg-icons/courses-icon/courses-icon.component';
import { SupportIconComponent } from './svg-icons/support-icon/support-icon.component';
import { WalletIconComponent } from './svg-icons/wallet-icon/wallet-icon.component';
import { ProjectIconComponent } from './svg-icons/project-icon/project-icon.component';
import { HostIconComponent } from './svg-icons/host-icon/host-icon.component';
import { ProfileIconComponent } from './svg-icons/profile-icon/profile-icon.component';
import { CommentIconComponent } from './svg-icons/comment-icon/comment-icon.component';
import { AmountDirective } from './directives/amount.directive';
import { RocketComponent } from './svg-icons/rocket/rocket.component';
import { SpeedComponent } from './svg-icons/speed/speed.component';
import { MemoryComponent } from './svg-icons/memory/memory.component';
import { SettingComponent } from './svg-icons/setting/setting.component';
import { LocationComponent } from './svg-icons/location/location.component';
import { DatabaseComponent } from './svg-icons/database/database.component';
import { EmailComponent } from './svg-icons/email/email.component';
import { LayersComponent } from './svg-icons/layers/layers.component';
import { WebComponent } from './svg-icons/web/web.component';
import { UpComponent } from './svg-icons/up/up.component';
import { DownComponent } from './svg-icons/down/down.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DiscountIconComponent } from './svg-icons/discount-icon/discount-icon.component';
import { TimeIconComponent } from './svg-icons/time-icon/time-icon.component';
import { PhoneIconComponent } from './svg-icons/phone-icon/phone-icon.component';
import { MessengerIconComponent } from './svg-icons/messenger-icon/messenger-icon.component';
import { WhatsappIconComponent } from './svg-icons/whatsapp-icon/whatsapp-icon.component';
import { TelegramIconComponent } from './svg-icons/telegram-icon/telegram-icon.component';
import { SoroushIconComponent } from './svg-icons/soroush-icon/soroush-icon.component';
import { VideoIconComponent } from './svg-icons/video-icon/video-icon.component';
import { VideoChatIconComponent } from './svg-icons/video-chat-icon/video-chat-icon.component';
import { ReferralSvgComponent } from './svg-icons/referral-svg/referral-svg.component';
import { NormalizePhoneDirective } from './directives/normalize-phone.directive';


@NgModule({
  declarations: [
    HeaderComponent,
    CarouselComponent,
    CardComponent,
    CardListComponent,
    TextDividerComponent,
    JumbotronComponent,
    CardCarouselComponent,
    TestimonialCardComponent,
    FilteredCardsComponent,
    FooterComponent,
    LayoutComponent,
    BlankLayoutComponent,
    LoadingButtonComponent,
    LoadingOverlayComponent,
    WebCourseIconComponent,
    CoursesIconComponent,
    SupportIconComponent,
    WalletIconComponent,
    ProjectIconComponent,
    HostIconComponent,
    ProfileIconComponent,
    CommentIconComponent,
    DiscountIconComponent,
    AmountDirective,
    RocketComponent,
    SpeedComponent,
    MemoryComponent,
    SettingComponent,
    LocationComponent,
    DatabaseComponent,
    EmailComponent,
    LayersComponent,
    WebComponent,
    UpComponent,
    DownComponent,
    NotFoundComponent,
    TimeIconComponent,
    PhoneIconComponent,
    MessengerIconComponent,
    WhatsappIconComponent,
    TelegramIconComponent,
    SoroushIconComponent,
    VideoIconComponent,
    VideoChatIconComponent,
    ReferralSvgComponent,
    NormalizePhoneDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    CarouselComponent,
    CardListComponent,
    JumbotronComponent,
    CardCarouselComponent,
    FilteredCardsComponent,
    TextDividerComponent,
    LayoutComponent,
    BlankLayoutComponent,
    LoadingButtonComponent,
    LoadingOverlayComponent,
    WebCourseIconComponent,
    CoursesIconComponent,
    SupportIconComponent,
    WalletIconComponent,
    ProjectIconComponent,
    HostIconComponent,
    ProfileIconComponent,
    CommentIconComponent,
    DiscountIconComponent,
    AmountDirective,
    RocketComponent,
    SpeedComponent,
    MemoryComponent,
    SettingComponent,
    LocationComponent,
    DatabaseComponent,
    EmailComponent,
    LayersComponent,
    WebComponent,
    DownComponent,
    UpComponent,
    NotFoundComponent,
    TimeIconComponent,
    PhoneIconComponent,
    MessengerIconComponent,
    WhatsappIconComponent,
    TelegramIconComponent,
    SoroushIconComponent,
    VideoIconComponent,
    VideoChatIconComponent,
    ReferralSvgComponent,
    NormalizePhoneDirective
  ]
})
export class SharedModule { }
