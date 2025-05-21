import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { DecimalPipe } from '@angular/common';
import { PaymentHttpService } from '../../../core/services/payment-http.service';
import { ISuggestedWalletAmount } from '../../../models/ISuggestedWalletAmount';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'hw-add-balance',
  templateUrl: './add-balance.component.html',
  styleUrl: './add-balance.component.css',
  providers: [DecimalPipe]
})
export class AddBalanceComponent implements OnInit {
  Messages = Messages;
  isModalOpen: boolean = false;
  amount: string = '';
  suggestedAmounts: ISuggestedWalletAmount[] = [];
  selectedAmount: number | null = null;
  constructor(private decimalPipe: DecimalPipe,
    private paymentHttpService: PaymentHttpService,
    private loadingService: LoadingService
  ) { }
  ngOnInit(): void {
    this.loadingService.show();
    this.paymentHttpService.getSuggestedWalletAmounts().subscribe({
      next: (data) => {
        this.suggestedAmounts = data;
        this.loadingService.hide();
      },
      error: (error) => {
        console.error(error);
        this.loadingService.hide();
      }
    });
  }
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  setSuggestedAmount(value: ISuggestedWalletAmount): void {
    this.amount = this.decimalPipe.transform(value.amount, '1.0-0') || '';
    this.selectedAmount = value.id;
  }

  onAmountInputChange(): void {
    this.selectedAmount = null;
  }

  goToPayment() {
    const parsed = Number(this.amount.replaceAll(',', ''));
    if (isNaN(parsed)) {
      return;
    }

    const amountInRial = parsed * 10;
    const url = `https://zarinp.al/mazwebprog?amount=${amountInRial}`;
    window.open(url, '_blank');
  }
}
