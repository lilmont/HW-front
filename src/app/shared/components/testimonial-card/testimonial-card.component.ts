import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'hw-testimonial-card',
  templateUrl: './testimonial-card.component.html',
  styleUrl: './testimonial-card.component.css'
})
export class TestimonialCardComponent {
  baseUrl = environment.apiBaseUrl;
  @Input() avatar: string = '';
  @Input() name: string = '';
  @Input() text: string = '';
}
