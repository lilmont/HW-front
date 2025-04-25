import { Component } from '@angular/core';

@Component({
  selector: 'hw-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  isSidebarOpen: boolean = true;

  onSidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
