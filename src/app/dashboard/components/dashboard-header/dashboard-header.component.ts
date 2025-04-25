import { Component, EventEmitter, Output, output } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { JwtHelperService } from '../../../core/services/jwt.helper.service';

@Component({
  selector: 'hw-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css'
})
export class DashboardHeaderComponent {
  Messages = Messages;
  showDropdown: boolean = false;

  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(public jwtHelperService: JwtHelperService) {

  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  logout() {
    this.jwtHelperService.logout();
  }
}
