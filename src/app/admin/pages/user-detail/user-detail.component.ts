import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../../core/services/loading.service';
import { HostHttpService } from '../../services/host-http.service';
import { IUserHost } from '../../../models/IUserHost';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'hw-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  Messages = Messages
  activeTab: 'general' | 'transaction' | 'hosting' | 'course' = 'general';
  userId: number | undefined = undefined;
  userHosts: IUserHost[] = [];

  constructor(private route: ActivatedRoute,
    private loadingService: LoadingService,
    private hostHttpService: HostHttpService,
    private toastr: ToastService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
    });

    if (this.userId)
      this.getUserHostsForUser(this.userId);
  }

  getUserHostsForUser(userId: number) {
    this.loadingService.show();
    this.hostHttpService.getUserHosts(userId).subscribe({
      next: (response) => {
        if (response.success) {
          this.userHosts = response.data;
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
}
