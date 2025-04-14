import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsGridComponent } from './components/testimonials-grid/testimonials-grid.component';
import { TestimonialsRoutingModule } from './testimonials-routing.module';



@NgModule({
  declarations: [
    TestimonialsGridComponent
  ],
  imports: [
    CommonModule,
    TestimonialsRoutingModule
  ]
})
export class TestimonialsModule { }
