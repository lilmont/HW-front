import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';
import { HostingHttpService } from '../../../core/services/hosting-http.service';
import { IUserHost } from '../../../models/IUserHost';
import { RefreshUserHostsListService } from '../../../core/services/refresh-user-hosts-list.service';

@Component({
  selector: 'hw-hosting',
  templateUrl: './hosting.component.html',
  styleUrl: './hosting.component.css'
})
export class HostingComponent implements OnInit {
  userHosts: IUserHost[] = [];
  hasActiveOrSuspendedHosts: boolean = false;

  constructor(private loadingService: LoadingService,
    private hostingHttpService: HostingHttpService,
    private refreshUserHostsListService: RefreshUserHostsListService
  ) {

  }
  ngOnInit(): void {
    this.getUserHostsForUser();

    this.refreshUserHostsListService.refreshHosts$.subscribe(() => {
      this.getUserHostsForUser();
    });
  }

  getUserHostsForUser() {
    this.loadingService.show();
    this.hostingHttpService.getUserHostsForUser().subscribe({
      next: (data) => {
        this.userHosts = data;

        this.hasActiveOrSuspendedHosts = data.some(host => host.status === 0 || host.status === 1);

        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }
  newDomainSubmitted() {
    this.getUserHostsForUser()
  }
}
