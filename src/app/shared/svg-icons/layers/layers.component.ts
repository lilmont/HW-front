import { Component } from '@angular/core';
import { Messages } from '../../../texts/messages';

@Component({
  selector: 'hw-layers',
  template: `<svg class="shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="#655DD6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#655DD6"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M22,13v8a1,1,0,0,1-1,1H13a1,1,0,0,1-1-1V13a1,1,0,0,1,1-1h8A1,1,0,0,1,22,13ZM7,6A1,1,0,0,0,6,7v9a1,1,0,0,0,1,1h3V10.5a.5.5,0,0,1,.5-.5H17V7a1,1,0,0,0-1-1ZM3,13H4V4.5A.5.5,0,0,1,4.5,4H13V3a1,1,0,0,0-1-1H3A1,1,0,0,0,2,3v9A1,1,0,0,0,3,13Z"></path></g></svg>`
})
export class LayersComponent {
  Messages = Messages;
}
