import { Component } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'hw-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
}
