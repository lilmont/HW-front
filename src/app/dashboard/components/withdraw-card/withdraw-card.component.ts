import { Component, Input } from '@angular/core';
import { IUserBalance } from '../../../models/IUserBalance';
import { Messages } from '../../../texts/messages';
import { PaymentHttpService } from '../../../core/services/payment-http.service';
import { LoadingService } from '../../../core/services/loading.service';
import { IWithdrawalRequest, WithdrawalRequest } from '../../../models/IWithdrawalRequest';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'hw-withdraw-card',
  templateUrl: './withdraw-card.component.html',
  styleUrl: './withdraw-card.component.css'
})
export class WithdrawCardComponent {
  Messages = Messages;
  isWithdrawalModalOpen: boolean = false;
  @Input() withdrawalInfo!: IUserBalance;
  withdrawalRequest: IWithdrawalRequest = new WithdrawalRequest();
  withdrawAmount: string = '0';
  withdrawAmountInvalid: boolean = false;
  withdrawAmountExceed: boolean = false;

  constructor(private paymentHttpService: PaymentHttpService,
    private loadingService: LoadingService,
    private toastr: ToastrService
  ) { }

  isSubmitWithdrawalRequestDisabled(): boolean {
    return this.withdrawalInfo.withdrawableBalance < 10000;
  }

  openWithdrawalModal(): void {
    if (this.isSubmitWithdrawalRequestDisabled()) {
      this.toastr.warning(Messages.Warnings.withdrawIsDisabled, '');
      return;
    }
    this.resetModal();
    this.isWithdrawalModalOpen = true;
  }

  closeWithdrawalModal(): void {
    this.isWithdrawalModalOpen = false;
  }

  submitWithdrawalRequest(): void {
    const amountInNumber = Number(this.withdrawAmount.replaceAll(',', ''));

    if (amountInNumber > this.withdrawalInfo.withdrawableBalance) {
      this.withdrawAmountInvalid = false;
      this.withdrawAmountExceed = true;
      return;
    }

    if (!this.withdrawalInfo.withdrawableBalance || amountInNumber < 10000) {
      this.withdrawAmountExceed = false;
      this.withdrawAmountInvalid = true;
      return;
    }

    this.withdrawalRequest.withdrawAmount = amountInNumber;

    this.loadingService.show();
    this.paymentHttpService.addWithdrawalRequest(this.withdrawalRequest).subscribe({
      next: () => {
        this.resetModal();
        this.loadingService.hide();
        this.toastr.success(Messages.Success.withdrawlRequestSubmittedSuccessfully, '');
        this.closeWithdrawalModal();
        location.reload();
      },
      error: () => {
        this.resetModal();
        this.loadingService.hide();
      }
    });
  }

  resetModal() {
    this.withdrawAmount = '0';
    this.withdrawalRequest.withdrawAmount = 0;
    this.withdrawAmountExceed = false;
    this.withdrawAmountInvalid = false;
  }
}
