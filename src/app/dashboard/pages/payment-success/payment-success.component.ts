import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages } from '../../../texts/messages';
import { LoadingService } from '../../../core/services/loading.service';
import { PaymentHttpService } from '../../../core/services/payment-http.service';
import { IPaymentTokenVerificationResult } from '../../../models/IPaymentTokenVerificationResult';

@Component({
  selector: 'hw-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent {
  Messages = Messages;
  token: string | null = null;
  transactionInfo?: IPaymentTokenVerificationResult;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService,
    private paymentHttpService: PaymentHttpService
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('refId');

    this.token = this.route.snapshot.queryParamMap.get('token');

    if (this.token) {
      this.loadingService.show();
      this.paymentHttpService.verifyPaymentToken(this.token).subscribe({
        next: (data) => {
          this.transactionInfo = data;
          this.loadingService.hide();
        },
        error: () => {
          this.loadingService.hide();
        }
      });
    }
  }

  goToDashboard() {
    this.router.navigate(['dashboard/wallet']);
  }
}
