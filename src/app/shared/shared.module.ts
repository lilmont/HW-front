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
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CarouselComponent,
    CardListComponent,
    JumbotronComponent,
    CardCarouselComponent,
    FilteredCardsComponent,
    TextDividerComponent,
    LayoutComponent
  ]
})
export class SharedModule { }
