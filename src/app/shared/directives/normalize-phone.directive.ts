import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[hwNormalizePhone]'
})
export class NormalizePhoneDirective {
  constructor(private el: ElementRef, private model: NgModel) { }

  @HostListener('blur')
  @HostListener('keydown.enter')
  onBlur() {
    let input: string = this.el.nativeElement.value || '';

    // Remove spaces and non-digit characters
    input = input.replace(/\D+/g, '');

    // Replace country code +98, 0098, 098 with 0
    if (input.startsWith('0098')) {
      input = '0' + input.slice(4);
    } else if (input.startsWith('098')) {
      input = '0' + input.slice(3);
    } else if (input.startsWith('98')) {
      input = '0' + input.slice(2);
    }

    // Ensure it starts with 0
    if (!input.startsWith('0')) {
      input = '0' + input;
    }

    // Update both view and model
    this.el.nativeElement.value = input;
    this.model.viewToModelUpdate(input);
  }
}
