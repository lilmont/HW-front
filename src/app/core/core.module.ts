import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { JalaliDatePipe } from './pipes/jalali-date.pipe';



@NgModule({
  declarations: [
    JalaliDatePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [JalaliDatePipe]
})
export class CoreModule { }
