import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';
import { HostingHttpService } from '../../../core/services/hosting-http.service';
import { IUserHost } from '../../../models/IUserHost';

@Component({
  selector: 'hw-hosting',
  templateUrl: './hosting.component.html',
  styleUrl: './hosting.component.css'
})
export class HostingComponent implements OnInit {
  userHosts: IUserHost[] = [];

  constructor(private loadingService: LoadingService,
    private hostingHttpService: HostingHttpService
  ) {

  }
  ngOnInit(): void {
    this.getUserHostsForUser()
  }

  getUserHostsForUser() {
    this.loadingService.show();
    this.hostingHttpService.getUserHostsForUser().subscribe({
      next: (data) => {
        this.userHosts = data;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }
}
