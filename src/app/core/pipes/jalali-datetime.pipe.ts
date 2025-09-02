import { Pipe, PipeTransform } from '@angular/core';
import moment from 'jalali-moment';

@Pipe({
  name: 'jalaliDatetime'
})
export class JalaliDatetimePipe implements PipeTransform {

  transform(value: any, format: string = 'jYYYY/jMM/jDD HH:mm'): string {
    if (!value) return '';

    // Parse with explicit format
    const m = moment(value, "YYYY-MM-DDTHH:mm:ss.SSSSSSS");

    if (!m.isValid()) {
      return '';
    }

    return m.locale('fa').format(format);
  }

}
