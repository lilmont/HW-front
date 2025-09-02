import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { JalaliDatePipe } from './pipes/jalali-date.pipe';
import { NumberCommaSeparatorPipe } from './pipes/number-comma-separator.pipe';
import { JalaliDatetimePipe } from './pipes/jalali-datetime.pipe';



@NgModule({
  declarations: [
    JalaliDatePipe,
    NumberCommaSeparatorPipe,
    JalaliDatetimePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [JalaliDatePipe, NumberCommaSeparatorPipe, JalaliDatetimePipe]
})
export class CoreModule { }
