import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
  ]
})
export class CoursesModule { }
