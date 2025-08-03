import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberCommaSeparator'
})
export class NumberCommaSeparatorPipe implements PipeTransform {

  transform(value: string | number): string {
    if (value === null || value === undefined) return '';
    const num = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(num)) return value.toString();

    return num.toLocaleString('en-US'); // e.g., 1,400,000
  }

}
