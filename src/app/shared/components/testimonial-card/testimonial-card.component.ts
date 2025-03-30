import { Component, Input } from '@angular/core';

@Component({
  selector: 'hw-testimonial-card',
  templateUrl: './testimonial-card.component.html',
  styleUrl: './testimonial-card.component.css'
})
export class TestimonialCardComponent {
  @Input() avatar: string = '';
  @Input() name: string = '';
  @Input() text: string = '';
}
