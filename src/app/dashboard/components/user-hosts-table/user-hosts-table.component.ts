import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { IUserHost } from '../../../models/IUserHost';
import { LoadingService } from '../../../core/services/loading.service';
import { HostingHttpService } from '../../../core/services/hosting-http.service';
import { IPasswordRecovery, PasswordRecovery } from '../../../models/IPasswordRecovery';
import { RecoverPasswordRequest } from '../../../models/IRecoverPasswordRequest';

@Component({
  selector: 'hw-user-hosts-table',
  templateUrl: './user-hosts-table.component.html',
  styleUrl: './user-hosts-table.component.css'
})
export class UserHostsTableComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.initializeScrollbars();
  }
  Messages = Messages;
  showPasswordModal: boolean = false;
  loginInfo: IPasswordRecovery = new PasswordRecovery();
  @Input() userHosts: IUserHost[] = [];

  @ViewChild('topScrollbar') topScrollbar!: ElementRef;
  @ViewChild('tableContainer') tableContainer!: ElementRef;

  constructor(private loadingService: LoadingService,
    private hostingHttpService: HostingHttpService
  ) {

  }

  showExtendBtn(host: IUserHost): boolean {
    if (host.status != 2 && host.paymentStatus == 2) {
      return true;
    }
    return false;
  }

  showRestoreBtn(host: IUserHost): boolean {
    if (host.status != 2) {
      return true;
    }
    return false;
  }

  showInstallmentPayBtn(host: IUserHost): boolean {
    if (host.status != 2 && host.paymentStatus == 1) {
      return true;
    }
    return false;
  }

  private initializeScrollbars(): void {
    const topScrollbarEl = this.topScrollbar.nativeElement;
    const tableContainerEl = this.tableContainer.nativeElement;

    // Set the width of the top scrollbar to match the table container
    topScrollbarEl.firstChild.style.width = `${tableContainerEl.scrollWidth}px`;

    // Synchronize scroll positions
    topScrollbarEl.addEventListener('scroll', () => {
      tableContainerEl.scrollLeft = topScrollbarEl.scrollLeft;
    });

    tableContainerEl.addEventListener('scroll', () => {
      topScrollbarEl.scrollLeft = tableContainerEl.scrollLeft;
    });
  }

  recoverPassword(host: IUserHost): void {
    const recoverPasswordRequest = new RecoverPasswordRequest({ productId: host.id });

    this.loadingService.show();
    this.hostingHttpService.recoverPassword(recoverPasswordRequest).subscribe({
      next: (data) => {
        this.loadingService.hide();
        this.loginInfo = data;
        this.showPasswordModal = true;
      },
      error: () => {
        this.showPasswordModal = false;
        this.loadingService.hide();
      }
    });
  }

  onPasswordModalClose(): void {
    this.showPasswordModal = false;
    this.loginInfo = new PasswordRecovery();
  }

  extendHost(host: IUserHost): void {
    const recoverPasswordRequest = new RecoverPasswordRequest({ productId: host.id });

    this.loadingService.show();
    this.hostingHttpService.extendHost(recoverPasswordRequest).subscribe({
      next: () => {
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }
}
