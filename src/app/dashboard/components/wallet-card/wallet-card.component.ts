import { Component, OnDestroy, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { PaymentHttpService } from '../../../core/services/payment-http.service';
import { LoadingService } from '../../../core/services/loading.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hw-wallet-card',
  templateUrl: './wallet-card.component.html',
  styleUrl: './wallet-card.component.css'
})
export class WalletCardComponent implements OnInit, OnDestroy {
  Messages = Messages;
  balance: number = 0;

  private transactionSubscription: Subscription | null = null;

  constructor(private paymentHttpService: PaymentHttpService,
    private loadingService: LoadingService,
    private transactionService: TransactionService
  ) { }
  ngOnInit(): void {
    this.getUserBalance();
    this.transactionSubscription = this.transactionService.transactionSubmitted$.subscribe(() => {
      this.getUserBalance();
    });
  }

  ngOnDestroy() {
    if (this.transactionSubscription) {
      this.transactionSubscription.unsubscribe();
    }
  }

  onTransactionSuccess() {
    this.getUserBalance();
  }

  getUserBalance() {
    this.loadingService.show();
    this.paymentHttpService.getUserBalance().subscribe({
      next: (data) => {
        this.balance = data;
        this.loadingService.hide();
      },
      error: (error) => {
        this.loadingService.hide();
      }
    });
  }
}
