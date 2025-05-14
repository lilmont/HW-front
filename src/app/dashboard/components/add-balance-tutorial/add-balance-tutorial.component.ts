import { Component } from '@angular/core';
import { Messages } from '../../../texts/messages';

@Component({
  selector: 'hw-add-balance-tutorial',
  templateUrl: './add-balance-tutorial.component.html',
  styleUrl: './add-balance-tutorial.component.css'
})
export class AddBalanceTutorialComponent {
  Messages = Messages;
  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
