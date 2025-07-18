import { Component } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductDropdown } from '../../models/IProductDropdown';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../core/services/loading.service';
import { DiscountCodeHttpService } from '../../services/discount-code-http.service';
import { IDiscountCodeDetail } from '../../models/IDiscountCodeDetail';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'hw-discount-code-detail',
  templateUrl: './discount-code-detail.component.html',
  styleUrl: './discount-code-detail.component.css'
})
export class DiscountCodeDetailComponent {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  discountCodeForm!: FormGroup;
  products: IProductDropdown[] = []

  constructor(private route: ActivatedRoute,
    private loadingService: LoadingService,
    private discountCodeHttpService: DiscountCodeHttpService,
    private toastr: ToastService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProductsDropwdown();

    this.discountCodeForm = this.fb.group({
      discountPercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      userId: [null, Validators.required],
      destinationProductId: [null, Validators.required],
    });
  }

  getProductsDropwdown(): void {
    this.loadingService.show();
    this.discountCodeHttpService.getProductsDropwdown().subscribe({
      next: (response) => {
        if (response.success)
          this.products = response.data;
        else
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);

        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  AddDiscountCode() {
    if (this.discountCodeForm.invalid) {
      this.discountCodeForm.markAllAsTouched();
      return;
    }

    const formValues = this.discountCodeForm.value;

    const payload: IDiscountCodeDetail = {
      discountPercentage: formValues.discountPercentage.toString(),
      userId: formValues.userId.toString(),
      destinationProductId: formValues.destinationProductId.toString(),
    };

    this.loadingService.show();

    this.discountCodeHttpService.addDiscountCode(payload).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(Messages.Success.discountCodeAddedSuccessfully, '');
          this.router.navigate(['/mazmon/discount-codes']);
        } else {
          this.toastr.error(response.data ?? Messages.Errors.invalidRequest, Messages.Errors.error)
        }
        this.loadingService.hide();
      },
      error: () => {

        this.loadingService.hide();
      },
    });
  }
}
