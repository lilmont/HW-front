import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { JwtHelperService } from '../../../core/services/jwt.helper.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { UserInfoService } from '../../../core/services/user-info.service';
import { IUserInfo } from '../../../models/IUserInfo';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'hw-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css'
})
export class DashboardHeaderComponent implements OnInit, OnDestroy {
  Messages = Messages;
  showDropdown: boolean = false;
  baseUrl = environment.apiBaseUrl;
  private subscription!: Subscription;
  userInfo: IUserInfo = {
    firstName: '',
    lastName: '',
    avatarImage: ''
  }

  @ViewChild('dropdownButton') dropdownButton!: ElementRef;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  constructor(
    public jwtHelperService: JwtHelperService,
    private userInfoService: UserInfoService,
    private sidebarService: SidebarService
  ) {
    this.userInfoService.loadUser();
  }

  ngOnInit(): void {
    this.userInfoService.loadUser();
    this.subscription = this.userInfoService.user$.subscribe(user => {
      if (user) {
        this.userInfo.avatarImage = user.avatarImage ?? '';
        this.userInfo.firstName = user.firstName ?? '';
        this.userInfo.lastName = user.lastName ?? '';
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  onToggleSidebar(): void {
    this.sidebarService.toggle();
  }

  closeDropdown() {
    this.showDropdown = false;
  }

  // For closing the dropdown when clicking outside of it
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
