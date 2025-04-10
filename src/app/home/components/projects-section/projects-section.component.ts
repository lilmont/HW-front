import { Component, Input } from '@angular/core';

@Component({
  selector: 'hw-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.css'
})
export class ProjectsSectionComponent {
  @Input() title: string = "";
  @Input() linkText: string = "";
  @Input() hasLink: boolean = false;
}
