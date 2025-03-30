import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderProjectFormComponent } from './components/order-project-form/order-project-form.component';



@NgModule({
  declarations: [
    OrderProjectFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OrderProjectFormComponent
  ]
})
export class HomeModule { }
