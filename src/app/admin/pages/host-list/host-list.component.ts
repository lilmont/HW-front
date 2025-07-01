import { Component } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { IHostListItem } from '../../models/IHostListItem';
import { HostQueryParameters } from '../../models/IHostQueryParameters';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../../core/services/loading.service';
import { HostHttpService } from '../../services/host-http.service';

@Component({
  selector: 'hw-host-list',
  templateUrl: './host-list.component.html',
  styleUrl: './host-list.component.css'
})
export class HostListComponent {
  Messages = Messages;
  hostingPlans: IHostListItem[] = [];
  totalCount = 0;
  filters: HostQueryParameters = new HostQueryParameters();

  constructor(private hostHttpService: HostHttpService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadHostingPlans();
  }

  loadHostingPlans() {
    this.loadingService.show();
    this.hostHttpService.getPagedHostingPlans(this.filters).subscribe({
      next: (response) => {
        if (response.success) {
          this.hostingPlans = response.data.items;
          this.totalCount = response.data.totalCount;
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error)
        }
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });

  }

  onPageChange(page: any) {
    this.filters.pageNumber = page;
    this.loadHostingPlans();
  }
}
