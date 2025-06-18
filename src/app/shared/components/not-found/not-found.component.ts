import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Messages } from '../../../texts/messages';

@Component({
  selector: 'hw-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
}
