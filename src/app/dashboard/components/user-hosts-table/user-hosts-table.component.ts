import { AfterViewInit, Component, ElementRef, HostListener, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { IUserHost } from '../../../models/IUserHost';
import { LoadingService } from '../../../core/services/loading.service';
import { HostingHttpService } from '../../../core/services/hosting-http.service';
import { IPasswordRecovery, PasswordRecovery } from '../../../models/IPasswordRecovery';
import { RecoverPasswordRequest } from '../../../models/IRecoverPasswordRequest';
import { RefreshUserHostsListService } from '../../../core/services/refresh-user-hosts-list.service';
import { ToastService } from '../../../core/services/toast.service';

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
  openDropdownIndex: number | null = null;
  dropdownPosition: { top: string; left: string } = { top: '0px', left: '0px' };

  @ViewChildren('dropdownTd') dropdownTds!: QueryList<ElementRef>;
  @ViewChild('topScrollbar') topScrollbar!: ElementRef;
  @ViewChild('tableContainer') tableContainer!: ElementRef;

  constructor(private loadingService: LoadingService,
    private hostingHttpService: HostingHttpService,
    private refreshUserHostsListService: RefreshUserHostsListService,
    private toastr: ToastService,
  ) {

  }

  toggleDropdown(index: number, event: MouseEvent, td: HTMLElement): void {
    if (this.openDropdownIndex === index) {
      this.openDropdownIndex = null;
    } else {
      this.openDropdownIndex = index;
      const button = (event.target as HTMLElement).closest('button');
      if (button) {
        const rect = button.getBoundingClientRect();
        const tableRect = this.tableContainer.nativeElement.getBoundingClientRect();
        // Position dropdown's left edge at button's left edge for LTR
        let left = rect.left + window.scrollX;
        // Ensure dropdown stays within table bounds to avoid horizontal scroll
        if (left < tableRect.left + window.scrollX) {
          left = tableRect.left + window.scrollX; // Align left edge with table's left
        }
        if (left + 192 > tableRect.right + window.scrollX) {
          left = tableRect.right + window.scrollX - 192; // Align right edge with table's right
        }
        this.dropdownPosition = {
          top: `${rect.bottom + window.scrollY}px`,
          left: `${left}px`
        };
      }
    }
  }

  closeDropdown(): void {
    this.openDropdownIndex = null;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent): void {
    if (this.openDropdownIndex !== null) {
      const clickedInside = this.dropdownTds.toArray()[this.openDropdownIndex]?.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.closeDropdown();
      }
    }
  }

  showExtendBtn(host: IUserHost): boolean {
    if (host.status != 2 && host.paymentStatus == 2 && this.isExpiringSoon(host.expirationDate) && host.domain != null) {
      return true;
    }
    return false;
  }

  isExpiringSoon(expirationDate: string | Date): boolean {
    const today = new Date();
    const expiry = new Date(expirationDate);
    const timeDiff = expiry.getTime() - today.getTime();
    const daysLeft = timeDiff / (1000 * 3600 * 24);
    return daysLeft <= 10;
  }

  showRestoreBtn(host: IUserHost): boolean {
    if (host.status == 0 && host.domain) {
      return true;
    }
    return false;
  }

  showSettlementBtn(host: IUserHost): boolean {
    if (host.status != 2 && host.paymentStatus == 1) {
      return true;
    }
    return false;
  }

  showUpgradeBtn(host: IUserHost): boolean {
    if (host.status == 0 && host.paymentStatus == 2 && !host.isUpgraded) {
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
        this.toastr.success(Messages.Success.hostExtendedSuccessfully, '');
        this.refreshUserHostsListService.triggerRefreshHosts();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  settleHost(host: IUserHost): void {
    const recoverPasswordRequest = new RecoverPasswordRequest({ productId: host.id });

    this.loadingService.show();
    this.hostingHttpService.settleHost(recoverPasswordRequest).subscribe({
      next: () => {
        this.loadingService.hide();
        this.toastr.success(Messages.Success.hostSettledSuccessfully, '');
        this.refreshUserHostsListService.triggerRefreshHosts();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  upgradeHost(host: IUserHost): void {
    const recoverPasswordRequest = new RecoverPasswordRequest({ productId: host.id });

    this.loadingService.show();
    this.hostingHttpService.upgradeHost(recoverPasswordRequest).subscribe({
      next: () => {
        this.loadingService.hide();
        this.toastr.success(Messages.Success.hostUpgradedSuccessfully, '');
        this.refreshUserHostsListService.triggerRefreshHosts();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }
}
