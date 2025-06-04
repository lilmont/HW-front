import { Component, Input } from '@angular/core';
import { ICourseCardInfo } from '../../../models/ICourseCardInfo';

@Component({
  selector: 'hw-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {
  @Input() cards: ICourseCardInfo[] = [];
}
