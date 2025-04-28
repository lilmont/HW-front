import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, output, ViewChild } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { JwtHelperService } from '../../../core/services/jwt.helper.service';
import { UserService } from '../../../core/services/user.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'hw-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css'
})
export class DashboardHeaderComponent implements OnInit {
  Messages = Messages;
  showDropdown: boolean = false;
  avatarImage: string | undefined = '';
  baseUrl = environment.apiBaseUrl;

  @Output() toggleSidebar = new EventEmitter<void>();
  @ViewChild('dropdownButton') dropdownButton!: ElementRef;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  constructor(
    public jwtHelperService: JwtHelperService,
    private userService: UserService) {

  }
  ngOnInit(): void {
    this.userService.getUserInfo().subscribe({
      next: (data) => {
        this.avatarImage = data.avatarImage;
      },
      error: (error) => {

      }
    });
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
    if (this.dropdownMenu?.nativeElement?.contains(target)) {
      this.closeDropdown();
      return;
    }

    this.closeDropdown();
  }

  logout() {
    this.jwtHelperService.logout();
    location.href = '/';
  }
}
