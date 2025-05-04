import { Pipe, PipeTransform } from '@angular/core';
import moment from 'jalali-moment';

@Pipe({
  name: 'jalaliDate'
})
export class JalaliDatePipe implements PipeTransform {

  transform(value: any, format: string = 'jYYYY/jMM/jDD'): string {
    if (!value) return '';
    return moment(value).locale('fa').format(format);
  }

}
