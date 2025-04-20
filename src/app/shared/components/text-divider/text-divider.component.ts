import { Component, Input } from '@angular/core';

@Component({
  selector: 'hw-text-divider',
  templateUrl: './text-divider.component.html',
  styleUrl: './text-divider.component.css'
})
export class TextDividerComponent {
  @Input() title: string = '';
  @Input() linkText: string = '';
  @Input() hasLink: boolean = false;
  @Input() linkRoute: string = '';
}
