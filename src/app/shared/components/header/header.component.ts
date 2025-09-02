import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { JwtHelperService } from '../../../core/services/jwt.helper.service';
import { environment } from '../../../../environments/environment';
import { IUserInfo } from '../../../models/IUserInfo';
import { Subscription, filter } from 'rxjs';
import { UserInfoService } from '../../../core/services/user-info.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'hw-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  Messages = Messages;
  showDropdown: boolean = false;
  isNavbarOpen: boolean = false;
  avatarImage: string | undefined = '';
  baseUrl = environment.apiBaseUrl;
  private subscription!: Subscription;
  userInfo: IUserInfo = {
    firstName: '',
    lastName: '',
    avatarImage: ''
  }
  activeFragment: string | null = null;
  activeRoute: string = '';

  constructor(public jwtHelperService: JwtHelperService,
    private userInfoService: UserInfoService,
    private eRef: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }
  ngOnInit(): void {
    this.setActiveRoute();

    this.userInfoService.loadUser();
    this.subscription = this.userInfoService.user$.subscribe(user => {
      if (user) {
        this.userInfo.avatarImage = user.avatarImage ?? '';
        this.userInfo.firstName = user.firstName ?? '';
        this.userInfo.lastName = user.lastName ?? '';
      }
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.activeRoute = this.router.url.split('#')[0]; // base route
      this.activeFragment = this.route.snapshot.fragment;
    });
  }

  private setActiveRoute(): void {
    this.activeRoute = this.router.url.split('#')[0];
    this.activeFragment = this.route.snapshot.fragment;
  }

  isActive(path: string, fragment?: string): boolean {
    if (fragment) {
      // Match route AND specific fragment
      return this.activeRoute === path && this.activeFragment === fragment;
    } else {
      // Active only when route matches AND no fragment is present
      return this.activeRoute === path && !this.activeFragment;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  closeNavbar() {
    this.isNavbarOpen = false;
  }

  logout() {
    this.jwtHelperService.logout();
  }

  closeNavbarAndDropdown() {
    this.showDropdown = false;
    this.isNavbarOpen = false;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isNavbarOpen = false;
      this.showDropdown = false;
    }
  }
}
