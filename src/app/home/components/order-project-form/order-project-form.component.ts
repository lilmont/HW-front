import { Component } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'hw-order-project-form',
  templateUrl: './order-project-form.component.html',
  styleUrl: './order-project-form.component.css'
})
export class OrderProjectFormComponent {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
}
