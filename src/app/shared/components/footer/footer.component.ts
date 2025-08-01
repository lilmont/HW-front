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

  openSamandehiPopup(): void {
    window.open(
      'https://logo.samandehi.ir/Verify.aspx?id=195265&p=rfthpfvldshwuiwkgvkadshw',
      'Popup',
      'toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30'
    );
  }

}
