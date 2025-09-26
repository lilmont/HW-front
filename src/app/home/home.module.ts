import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderProjectFormComponent } from './components/order-project-form/order-project-form.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AcademyComponent } from './components/academy/academy.component';



@NgModule({
  declarations: [
    OrderProjectFormComponent,
    HomePageComponent,
    ProjectsSectionComponent,
    ContactUsComponent,
    AcademyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    FormsModule,
  ],
  exports: [
    OrderProjectFormComponent,
  ]
})
export class HomeModule { }
