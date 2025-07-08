import { Component, Input } from '@angular/core';
import { IUserBalance } from '../../../models/IUserBalance';
import { Messages } from '../../../texts/messages';

@Component({
  selector: 'hw-withdraw-card',
  templateUrl: './withdraw-card.component.html',
  styleUrl: './withdraw-card.component.css'
})
export class WithdrawCardComponent {
  Messages = Messages;
  isWithdrawalModalOpen: boolean = false;
  @Input() withdrawalInfo!: IUserBalance;
  withdrawAmount: string = '0';
  withdrawAmountInvalid: boolean = false;

  openWithdrawalModal(): void {
    this.withdrawAmountInvalid = false;
    this.withdrawAmount = '0'
    this.isWithdrawalModalOpen = true;
  }

  closeWithdrawalModal(): void {
    this.isWithdrawalModalOpen = false;
  }

  submitWithdrawalRequest(): void {
    const amountInNumber = Number(this.withdrawAmount.replaceAll(',', ''));

    if (amountInNumber > this.withdrawalInfo.withdrawableBalance) {
      this.withdrawAmountInvalid = true;
      return;
    }
  }
}
