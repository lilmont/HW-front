import { Component, OnInit } from '@angular/core';
import { IDiscountCodeCard } from '../../../models/IDiscountCodeCard';
import { Messages } from '../../../texts/messages';
import { UserHttpService } from '../../../core/services/user-http.service';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'hw-discount-codes',
  templateUrl: './discount-codes.component.html',
  styleUrl: './discount-codes.component.css'
})
export class DiscountCodesComponent implements OnInit {
  Messages = Messages;
  discountCodes: IDiscountCodeCard[] = [];
  copied: boolean = false;

  constructor(private userHttpService: UserHttpService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.getDiscountCodes();
  }

  getDiscountCodes(): void {
    this.loadingService.show();
    this.userHttpService.getUserDiscountCodes().subscribe({
      next: (data) => {
        this.discountCodes = data;

        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  copyCode(discountCode: IDiscountCodeCard) {
    discountCode.copied = true;
    navigator.clipboard.writeText(discountCode.code).then(() => {
      setTimeout(() => {
        this.discountCodes.forEach(d => (d.copied = false));
      }, 2000);
    });
  }

}
