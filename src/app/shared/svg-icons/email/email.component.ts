import { Component } from '@angular/core';
import { Messages } from '../../../texts/messages';

@Component({
  selector: 'hw-email',
  template: `<svg class="shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="#655DD6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M22,5V9L12,13,2,9V5A1,1,0,0,1,3,4H21A1,1,0,0,1,22,5ZM2,11.154V19a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V11.154l-10,4Z"></path></g></svg>`
})
export class EmailComponent {
  Messages = Messages;
}
