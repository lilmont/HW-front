import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { PaymentHttpService } from '../../../core/services/payment-http.service';
import { IUserTransaction } from '../../../models/IUserTransaction';

@Component({
  selector: 'hw-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit {
  Messages = Messages;
  sessions = [];
  transactions: IUserTransaction[] = [];

  constructor(private paymentHttpService: PaymentHttpService) {
  }
  ngOnInit(): void {
    this.paymentHttpService.getUserTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (error) => {
      }
    });
  }
}
