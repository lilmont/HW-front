import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { SIDEBAR_ITEMS } from './sidebar.config';
import { Router } from '@angular/router';
import { SidebarService } from '../../../core/services/sidebar.service';
import { UserHttpService } from '../../../core/services/user-http.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ISidebarItem } from '../../../models/ISidebarItem';

@Component({
  selector: 'hw-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.css'
})
export class DashboardSidebarComponent implements OnInit, OnDestroy {
  Messages = Messages;
  sidebarItems: ISidebarItem[] = [];

  constructor(private router: Router,
    private eRef: ElementRef,
    public sidebarService: SidebarService,
    private userHttpService: UserHttpService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    document.addEventListener('click', this.handleClickOutside, true);
    this.loadingService.show();
    this.userHttpService.hasSupportVideoAccess().subscribe({
      next: (data) => {
        this.sidebarItems = SIDEBAR_ITEMS.filter(item => {
          if (item.path === '/dashboard/support-videos') {
            return data.hasAccess;
          }
          if (item.path === '/dashboard/sample-support-videos') {
            return !data.hasAccess;
          }
          return true;
        });
        this.loadingService.hide();
      },
      error: () => {
        this.sidebarItems = SIDEBAR_ITEMS.filter(item => item.path !== '/dashboard/support-videos');
        this.loadingService.hide();
      }
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickOutside = (event: Event) => {
    const isClickInside = this.eRef.nativeElement.contains(event.target);
    const isSmallScreen = window.innerWidth < 1024;

    const headerElement = document.querySelector('hw-dashboard-header');
    const isHeaderClick = headerElement?.contains(event.target as Node);

    if (!isClickInside && isSmallScreen && !isHeaderClick) {
      this.sidebarService.close();
    }
  };

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  navigate(path: string) {
    this.router.navigateByUrl(path);

    if (window.innerWidth < 1024) {
      this.sidebarService.close();
    }
  }

}
