import { Component, Input, input } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { SIDEBAR_ITEMS } from './sidebar.config';
import { Router } from '@angular/router';

@Component({
  selector: 'hw-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.css'
})
export class DashboardSidebarComponent {
  Messages = Messages;
  @Input() isOpen: boolean = false;
  sidebarItems = SIDEBAR_ITEMS;

  constructor(private router: Router) { }

  isActive(path: string): boolean {
    return this.router.url.startsWith(path);
  }

  navigate(path: string) {
    this.router.navigateByUrl(path);
  }
}
