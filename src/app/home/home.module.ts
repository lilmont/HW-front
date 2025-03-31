import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderProjectFormComponent } from './components/order-project-form/order-project-form.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    OrderProjectFormComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    OrderProjectFormComponent,
  ]
})
export class HomeModule { }
