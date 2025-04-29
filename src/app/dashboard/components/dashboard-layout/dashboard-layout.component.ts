import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hw-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent implements OnInit {
  isSidebarOpen: boolean = false;
  layoutReady: boolean = false;

  ngOnInit(): void {
    this.isSidebarOpen = window.innerWidth >= 1024;
    this.layoutReady = true;
  }

  onSidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
