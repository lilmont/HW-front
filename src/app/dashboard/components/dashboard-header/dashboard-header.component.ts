import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, output, ViewChild } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { JwtHelperService } from '../../../core/services/jwt.helper.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { UserInfoService } from '../../../core/services/user-info.service';
import { IUserInfo } from '../../../models/IUserInfo';

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

  @Output() toggleSidebar = new EventEmitter<void>();
  @ViewChild('dropdownButton') dropdownButton!: ElementRef;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  constructor(
    public jwtHelperService: JwtHelperService,
    private userInfoService: UserInfoService) {

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
