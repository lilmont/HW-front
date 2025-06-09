import { Component } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'hw-spotplayer-tutorial',
  templateUrl: './spotplayer-tutorial.component.html',
  styleUrl: './spotplayer-tutorial.component.css'
})
export class SpotplayerTutorialComponent {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
