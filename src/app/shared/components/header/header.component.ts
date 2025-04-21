import { Component } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { JwtHelperService } from '../../../core/services/jwt.helper.service';

@Component({
  selector: 'hw-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  Messages = Messages;
  showDropdown: boolean = false;
  constructor(public jwtHelperService: JwtHelperService) {
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    this.jwtHelperService.logout();
  }
}
