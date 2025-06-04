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
    console.log("card", this.card)
    // this.router.navigateByUrl("/courses/web-course");
  }
}
