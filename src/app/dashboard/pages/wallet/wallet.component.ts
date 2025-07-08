import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { PaymentHttpService } from '../../../core/services/payment-http.service';
import { LoadingService } from '../../../core/services/loading.service';
import { IUserBalance, UserBalance } from '../../../models/IUserBalance';

@Component({
  selector: 'hw-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit {
  Messages = Messages;
  withdrawalInfo: IUserBalance = new UserBalance();
  balance: number = 0;

  constructor(private paymentHttpService: PaymentHttpService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.getUserBalance();
    this.getUserWithdrawalInfo();
  }

  getUserBalance() {
    this.loadingService.show();
    this.paymentHttpService.getUserBalance().subscribe({
      next: (data) => {
        this.balance = data;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  getUserWithdrawalInfo() {
    this.loadingService.show();
    this.paymentHttpService.getUserWithdrawalInfo().subscribe({
      next: (data) => {
        this.withdrawalInfo = data;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }
}
