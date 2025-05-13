import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[hwAmount]',
  providers: [DecimalPipe]
})
export class AmountDirective {

  constructor(private el: ElementRef,
    private decimalPipe: DecimalPipe
  ) { }

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    input.value = this.decimalPipe.transform(value, '1.0-0') || '';
  }

}
