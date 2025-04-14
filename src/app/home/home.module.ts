import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderProjectFormComponent } from './components/order-project-form/order-project-form.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    OrderProjectFormComponent,
    HomePageComponent,
    ProjectsSectionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ],
  exports: [
    OrderProjectFormComponent,
  ]
})
export class HomeModule { }
