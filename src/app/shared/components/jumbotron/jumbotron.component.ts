import { Component } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'hw-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrl: './jumbotron.component.css'
})
export class JumbotronComponent {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
}
