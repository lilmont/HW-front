import { Component, Input } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { HostPlanInfo } from '../../../models/IHostPlanInfo';
import { BehaviorSubject } from 'rxjs';
import { HostingHttpService } from '../../../core/services/hosting-http.service';
import { UserHttpService } from '../../../core/services/user-http.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastService } from '../../../core/services/toast.service';
import { RefreshUserHostsListService } from '../../../core/services/refresh-user-hosts-list.service';

@Component({
  selector: 'hw-create-host-modal',
  templateUrl: './create-host-modal.component.html',
  styleUrl: './create-host-modal.component.css'
})
export class CreateHostModalComponent {
  Messages = Messages;
  isModalOpen: boolean = false;
  hostingPlanInfo: HostPlanInfo = new HostPlanInfo();
  emptyFullName: boolean = false;
  emailInvalid: boolean = false;

  private _buttonLoading = new BehaviorSubject<boolean>(false);
  readonly buttonLoading$ = this._buttonLoading.asObservable();

  @Input() hostingPlanId: number = 0;
  @Input() hostingPlanTitle: string = "";

  constructor(private hostingHttpService: HostingHttpService,
    private loadingService: LoadingService,
    private userHttpService: UserHttpService,
    private toastr: ToastService,
    private refreshUserHostsListService: RefreshUserHostsListService
  ) { }

  openModal() {
    this.getUserInfo();
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  getUserInfo() {
    this.loadingService.show();
    this.userHttpService.getUserInfo().subscribe({
      next: (data) => {
        this.hostingPlanInfo.email = data.email ?? '';
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  createHost() {
    this.emailInvalid = !this.isEmailValid(this.hostingPlanInfo.email ?? '');
    this.emptyFullName = !this.hostingPlanInfo.fullname || this.hostingPlanInfo.fullname.trim() === '';

    if (this.emailInvalid || this.emptyFullName) {
      return;
    }
    this.hostingPlanInfo.productId = this.hostingPlanId;
    this._buttonLoading.next(true);
    this.hostingHttpService.SubmitHostingPlan(this.hostingPlanInfo).subscribe({
      next: () => {
        this.toastr.success(Messages.Success.hostSubmittedSuccessfully, '');
        this.refreshUserHostsListService.triggerRefreshHosts();
        this._buttonLoading.next(false);
        this.closeModal();
      },
      error: () => {
        this._buttonLoading.next(false);
      }
    });
  }

  private isEmailValid(email: string): boolean {
    if (!email) return false;
    if (email.trim() === '') return false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
