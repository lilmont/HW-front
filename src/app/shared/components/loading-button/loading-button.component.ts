import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Messages } from '../../../texts/messages';

@Component({
  selector: 'hw-loading-button',
  templateUrl: './loading-button.component.html',
})
export class LoadingButtonComponent {
  @Input() loading$!: Observable<boolean>;
  @Input() label!: string;
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';

  Messages = Messages;
}
