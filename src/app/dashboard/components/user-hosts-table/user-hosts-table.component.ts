import { AfterViewInit, Component, ElementRef, HostListener, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { IUserHost } from '../../../models/IUserHost';
import { LoadingService } from '../../../core/services/loading.service';
import { HostingHttpService } from '../../../core/services/hosting-http.service';
import { IPasswordRecovery, PasswordRecovery } from '../../../models/IPasswordRecovery';
import { RecoverPasswordRequest } from '../../../models/IRecoverPasswordRequest';
import { RefreshUserHostsListService } from '../../../core/services/refresh-user-hosts-list.service';
import { ToastService } from '../../../core/services/toast.service';
import { PaymentHttpService } from '../../../core/services/payment-http.service';
import { IUpgradableToHostingPlan } from '../../../models/IUpgradableToHostingPlan';
import { UpgradeRequiredBalanceRequest } from '../../../models/IUpgradeHostingPlanRequest';

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
  @Input() buttonsShown: boolean = true;
  openDropdownIndex: number | null = null;
  dropdownPosition: { top: string; left: string } = { top: '0px', left: '0px' };
  isChargeWalletModalOpen: boolean = false;
  chargeWalletAmountRequired: number = 0;
  isUpgradePlanModalOpen: boolean = false;
  upgradableToHostingPlans: IUpgradableToHostingPlan[] = [];
  targerUpgradeHostingPlanId: number | null = null;
  costOfUpgrade: number = 0;
  selectedHost: IUserHost | undefined = undefined;

  @ViewChildren('dropdownTd') dropdownTds!: QueryList<ElementRef>;
  @ViewChild('topScrollbar') topScrollbar!: ElementRef;
  @ViewChild('tableContainer') tableContainer!: ElementRef;

  constructor(private loadingService: LoadingService,
    private hostingHttpService: HostingHttpService,
    private refreshUserHostsListService: RefreshUserHostsListService,
    private toastr: ToastService,
    private paymentHttpService: PaymentHttpService
  ) {

  }

  toggleDropdown(index: number, event: MouseEvent, td: HTMLElement): void {
    if (this.openDropdownIndex === index) {
      this.openDropdownIndex = null;
    } else {
      this.openDropdownIndex = index;

      const button = (event.target as HTMLElement).closest('button');
      if (!button) return;

      const rect = button.getBoundingClientRect();

      // wait until Angular renders the dropdown
      setTimeout(() => {
        const dropdown = document.querySelector('.my-open-dropdown') as HTMLElement;
        if (!dropdown) return;

        const dropdownHeight = dropdown.offsetHeight;
        const dropdownWidth = dropdown.offsetWidth;
        const viewportHeight = window.visualViewport?.height ?? window.innerHeight;

        // vertical positioning (down if fits, else up)
        let top: number;
        if (rect.bottom + dropdownHeight <= viewportHeight) {
          top = rect.bottom;
        } else {
          top = rect.top - dropdownHeight;
        }

        // horizontal positioning (keep inside table)
        let left = rect.left;
        const tableRect = this.tableContainer.nativeElement.getBoundingClientRect();
        if (left < tableRect.left) left = tableRect.left;
        if (left + dropdownWidth > tableRect.right) {
          left = tableRect.right - dropdownWidth;
        }

        this.dropdownPosition = {
          top: `${top}px`,
          left: `${left}px`
        };
      }, 0);
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

  isExpiredWithinAMonth(expirationDate: string | Date): boolean {
    const today = new Date();
    const expiry = new Date(expirationDate);
    const timeDiff = expiry.getTime() - today.getTime();
    const daysLeft = timeDiff / (1000 * 3600 * 24);
    return daysLeft <= 30;
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
    if (host.status == 0 && host.paymentStatus == 2) {
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

  openChgargeWalletModal(): void {
    if (!this.selectedHost || !this.targerUpgradeHostingPlanId)
      return;

    const upgradeRequiredBalanceRequest = new UpgradeRequiredBalanceRequest({ productId: this.selectedHost.id, targetHostingPlanId: this.targerUpgradeHostingPlanId });

    this.loadingService.show();
    this.hostingHttpService.getUpgradeHostingPlanRequiredBalance(upgradeRequiredBalanceRequest).subscribe({
      next: (response) => {
        if (response <= 0) {
          this.hostingHttpService.upgradeHost(upgradeRequiredBalanceRequest).subscribe({
            next: () => {
              this.closeUpgradePlanModal();
              this.loadingService.hide();
              this.toastr.success(Messages.Success.hostUpgradedSuccessfully, '');
              this.refreshUserHostsListService.triggerRefreshHosts();
            },
            error: () => {
              this.loadingService.hide();
            }
          });
        }
        else {
          this.isChargeWalletModalOpen = true;
          this.closeUpgradePlanModal();
          this.chargeWalletAmountRequired = response;
          this.loadingService.hide();
        }
      },
      error: () => {
        this.loadingService.hide();
      }
    });

  }

  closeChgargeWalletModal(): void {
    this.isChargeWalletModalOpen = false;
  }

  goToPayment() {
    const price = this.chargeWalletAmountRequired;
    if (!price || isNaN(price)) {
      return;
    }

    const amountInRial = price * 10;

    this.loadingService.show();
    this.paymentHttpService.getPaymentLink(amountInRial).subscribe({
      next: (data) => {
        this.loadingService.hide();
        this.closeChgargeWalletModal();
        window.open(data, '_blank');
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  openUpgradePlanModal(host: IUserHost): void {
    if (this.isExpiredWithinAMonth(host.expirationDate)) {
      this.toastr.error(Messages.Errors.cannotUpgradeAboutToBeExpiredHost, Messages.Errors.error);
      this.closeUpgradePlanModal();
      return;
    }

    this.loadingService.show();
    this.hostingHttpService.getUpgradableToHostingPlans(host.productId).subscribe({
      next: (data) => {
        this.upgradableToHostingPlans = data;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
    this.isUpgradePlanModalOpen = true;
    this.selectedHost = host;
  }

  closeUpgradePlanModal() {
    this.isUpgradePlanModalOpen = false;
    this.selectedHost = undefined;
    this.costOfUpgrade = 0;
    this.targerUpgradeHostingPlanId = null;
  }

  UpdateHostingPlanTargetId() {
    if (this.selectedHost && this.targerUpgradeHostingPlanId) {
      this.loadingService.show();
      this.hostingHttpService.getUpgradeHostCost(this.selectedHost.id, this.targerUpgradeHostingPlanId).subscribe({
        next: (data) => {
          this.costOfUpgrade = data.cost;
          this.loadingService.hide();
        },
        error: () => {
          this.loadingService.hide();
        }
      });
    }
  }
}
