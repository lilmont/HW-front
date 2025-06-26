import { Component } from '@angular/core';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'hw-admin-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  layoutReady: boolean = false;
  isOpen$ = this.sidebarService.isOpen$;
  constructor(public sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.layoutReady = true;
  }
}
