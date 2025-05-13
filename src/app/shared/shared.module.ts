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
  ]
})
export class SharedModule { }
