import { Component } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { PaymentHttpService } from '../../../core/services/payment-http.service';
import { ToastService } from '../../../core/services/toast.service';
import { BehaviorSubject } from 'rxjs';
import { TransactionService } from '../../../core/services/transaction.service';

@Component({
  selector: 'hw-submit-receipt',
  templateUrl: './submit-receipt.component.html',
  styleUrl: './submit-receipt.component.css'
})
export class SubmitReceiptComponent {
  Messages = Messages;
  isModalOpen: boolean = false;
  transactionNumber: string = '';
  timer: number = 0;
  timerInterval: any;
  isConfirmButtonDisabled: boolean = false;
  transactionNumberInvalid: boolean = false;
  showWaitingMessage: boolean = false;
  private _buttonLoading = new BehaviorSubject<boolean>(false);
  readonly buttonLoading$ = this._buttonLoading.asObservable();

  constructor(private paymentHttpService: PaymentHttpService,
    private toastr: ToastService,
    private transactionService: TransactionService
  ) { }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    if (!this._buttonLoading.value)
      this.transactionNumber = '';
    this.isModalOpen = false;
  }

  submitReceipt() {
    this.transactionNumberInvalid = false;

    if (this.transactionNumber.trim() === '') {
      this.transactionNumberInvalid = true;
      return
    }

    this._buttonLoading.next(true);
    this.showWaitingMessage = true;
    this.paymentHttpService.ValidateTransaction(this.transactionNumber).subscribe({
      next: () => {
        this.toastr.success(Messages.Success.submitTransactionSuccessful, '');
        this._buttonLoading.next(false);
        this.transactionService.emitTransactionSubmitted();
        this.showWaitingMessage = false;
        this.closeModal();
      },
      error: () => {
        this.startTimer();
        this.showWaitingMessage = false;
        this._buttonLoading.next(false);
      }
    });
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  startTimer() {
    this.isConfirmButtonDisabled = true;
    this.timer = 30;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.timerInterval);
        this.isConfirmButtonDisabled = false;
      }
    }, 1000);
  }
}
