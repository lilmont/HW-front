import { Component, ElementRef, EventEmitter, HostListener, Output, output, ViewChild } from '@angular/core';
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
  @ViewChild('dropdownButton') dropdownButton!: ElementRef;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  constructor(public jwtHelperService: JwtHelperService) {

  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  closeDropdown() {
    this.showDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (this.dropdownButton.nativeElement.contains(target)) {
      return;
    }
    if (this.dropdownMenu.nativeElement.contains(target)) {
      this.closeDropdown();
      return;
    }

    this.closeDropdown();
  }

  logout() {
    this.jwtHelperService.logout();
  }
}
