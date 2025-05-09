import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { PaymentHttpService } from '../../../core/services/payment-http.service';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'hw-wallet-card',
  templateUrl: './wallet-card.component.html',
  styleUrl: './wallet-card.component.css'
})
export class WalletCardComponent implements OnInit {
  Messages = Messages;
  balance: number = 0;

  constructor(private paymentHttpService: PaymentHttpService,
    private loadingService: LoadingService,
  ) { }
  ngOnInit(): void {
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
