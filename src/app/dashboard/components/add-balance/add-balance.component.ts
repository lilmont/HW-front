import { Component } from '@angular/core';
import { Messages } from '../../../texts/messages';

@Component({
  selector: 'hw-add-balance',
  templateUrl: './add-balance.component.html',
  styleUrl: './add-balance.component.css'
})
export class AddBalanceComponent {
  Messages = Messages;
}
