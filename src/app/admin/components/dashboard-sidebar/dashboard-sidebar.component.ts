import { Component, ElementRef } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { ISidebarItem } from '../../models/ISidebarItem';
import { Router } from '@angular/router';
import { SidebarService } from '../../../core/services/sidebar.service';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'hw-admin-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.css'
})
export class DashboardSidebarComponent {
  Messages = Messages;
  sidebarItems: ISidebarItem[] = [];

  constructor(private router: Router,
    private eRef: ElementRef,
    public sidebarService: SidebarService,
  ) { }

  ngOnInit(): void {
    document.addEventListener('click', this.handleClickOutside, true);
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
