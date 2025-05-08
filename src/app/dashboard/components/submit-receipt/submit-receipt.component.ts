import { Component } from '@angular/core';
import { Messages } from '../../../texts/messages';

@Component({
  selector: 'hw-submit-receipt',
  templateUrl: './submit-receipt.component.html',
  styleUrl: './submit-receipt.component.css'
})
export class SubmitReceiptComponent {
  Messages = Messages;
}
