import { Component, Input } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { Router } from '@angular/router';
import { ICourseCardInfo } from '../../../models/ICourseCardInfo';

@Component({
  selector: 'hw-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  Messages = Messages;
  @Input() card: ICourseCardInfo | undefined;

  constructor(private router: Router) { }

  navigateToCardPage(): void {

    if (!this.card) return;
    this.router.navigate(['/courses', this.card.id, this.toSlug(this.card.title)]);
  }

  toSlug(title: string): string {
    return title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/\-\-+/g, '-');
  }
}
