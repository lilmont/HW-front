import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { IWithdrawalRequestListItem } from '../../models/IWithdrawalRequestListItem';
import { WithdrawalQueryParameters } from '../../models/IWithdrawalQueryParameters';
import { LoadingService } from '../../../core/services/loading.service';
import { PaymentHttpService } from '../../services/payment-http.service';
import { RejectWithdrawalRequest } from '../../models/IRejectWithdrawalRequest';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'hw-withdrawal-list',
  templateUrl: './withdrawal-list.component.html',
  styleUrl: './withdrawal-list.component.css'
})
export class WithdrawalListComponent implements OnInit {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  withdrawalRequests: IWithdrawalRequestListItem[] = [];
  totalCount = 0;

  filters: WithdrawalQueryParameters = new WithdrawalQueryParameters();
  isConfirmWithdrawalRequestModalOpen: boolean = false;
  isRejectWithdrawalRequestModalOpen: boolean = false;
  isReceiptModalOpen: boolean = false;

  rejectWithdrawalRequestData: RejectWithdrawalRequest = new RejectWithdrawalRequest();
  selectedWithdrawalRequestId?: number = undefined;
  selectedWithdrawalRequestReceipt: string = '';
  selectedImage: File | null = null;
  imageInvalid = false;

  constructor(private paymentHttpService: PaymentHttpService,
    private toastr: ToastService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadWithdrawalRequests();
  }

  loadWithdrawalRequests() {
    this.loadingService.show();
    this.paymentHttpService.getPagedWithdrawalRequests(this.filters).subscribe({
      next: (response) => {
        if (response.success) {
          this.withdrawalRequests = response.data.items;
          this.totalCount = response.data.totalCount;
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error)
        }
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  onPageChange(page: any) {
    this.filters.pageNumber = page;
    this.loadWithdrawalRequests();
  }

  resetFilters() {
    this.filters.reset();
    this.loadWithdrawalRequests();
  }

  openConfirmWithdrawalRequestModal(id: number): void {
    this.selectedWithdrawalRequestId = id;
    this.isConfirmWithdrawalRequestModalOpen = true;
  }

  closeConfirmWithdrawalRequestModal(): void {
    this.selectedImage = null;
    this.imageInvalid = false;
    this.isConfirmWithdrawalRequestModalOpen = false;
  }


  onImageSelected(event: Event): void {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    if (file && !validImageTypes.includes(file.type)) {
      this.toastr.error(Messages.Errors.invalidImage, Messages.Errors.error);
      return;
    }

    this.selectedImage = file;

    if (input.files?.length) {
      const fileNameElement = document.getElementById("fileName");
      if (fileNameElement) {
        fileNameElement.textContent = input.files[0].name;
      }
    }
  }

  confirmWithdrawalRequest() {
    if (!this.selectedImage) {
      this.imageInvalid = true;
      return;
    }

    if (!this.selectedWithdrawalRequestId)
      return

    const formData = new FormData();
    formData.append('Id', this.selectedWithdrawalRequestId.toString());

    if (this.selectedImage)
      formData.append('ReceiptImageFile', this.selectedImage, this.selectedImage.name);

    this.loadingService.show();
    this.paymentHttpService.confirmWithdrawalRequest(formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(Messages.Success.confirmWithdrawalRequestSuccessful, '');
          this.loadWithdrawalRequests();
        } else {
          this.toastr.error(response.data ?? Messages.Errors.invalidRequest, Messages.Errors.error)
        }
        this.closeConfirmWithdrawalRequestModal();
        this.loadingService.hide();
        this.selectedImage = null;
      },
      error: () => {
        this.loadingService.hide();
        this.closeConfirmWithdrawalRequestModal();
      }
    });
  }

  openRejectWithdrawalRequestModal(id: number): void {
    this.rejectWithdrawalRequestData.id = id;
    this.isRejectWithdrawalRequestModalOpen = true;
  }

  closeRejectWithdrawalRequestModal(): void {
    this.isRejectWithdrawalRequestModalOpen = false;
  }

  rejectWithdrawalRequest() {
    this.loadingService.show();
    this.paymentHttpService.rejectWithdrawalRequest(this.rejectWithdrawalRequestData).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(Messages.Success.rejectWithdrawalRequestSuccessful, '');
          this.loadWithdrawalRequests();
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }
        this.closeRejectWithdrawalRequestModal();
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
        this.closeRejectWithdrawalRequestModal();
      }
    });
  }

  openReceiptModal(imagePath: string): void {
    this.selectedWithdrawalRequestReceipt = `${this.baseUrl}/uploads/withdraw/receipts/${imagePath}`
    this.isReceiptModalOpen = true;
  }

  closeReceiptModal(): void {
    this.selectedWithdrawalRequestReceipt = '';
    this.isReceiptModalOpen = false;
  }
}
