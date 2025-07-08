import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
  @Input() balance: number = 0;
  @Output() transactionChanged = new EventEmitter<void>();
  private transactionSubscription: Subscription | null = null;

  constructor(
    private transactionService: TransactionService
  ) { }
  ngOnInit(): void {
    this.transactionSubscription = this.transactionService.transactionSubmitted$.subscribe(() => {
      this.transactionChanged.emit();
    });
  }

  ngOnDestroy() {
    if (this.transactionSubscription) {
      this.transactionSubscription.unsubscribe();
    }
  }

  onTransactionSuccess() {
    this.transactionChanged.emit();;
  }


}
