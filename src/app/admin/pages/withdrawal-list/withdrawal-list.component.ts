import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { IWithdrawalRequestListItem } from '../../models/IWithdrawalRequestListItem';
import { WithdrawalQueryParameters } from '../../models/IWithdrawalQueryParameters';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../../core/services/loading.service';
import { PaymentHttpService } from '../../services/payment-http.service';
import { RejectWithdrawalRequest } from '../../models/IRejectWithdrawalRequest';

@Component({
  selector: 'hw-withdrawal-list',
  templateUrl: './withdrawal-list.component.html',
  styleUrl: './withdrawal-list.component.css'
})
export class WithdrawalListComponent implements OnInit {
  Messages = Messages;
  withdrawalRequests: IWithdrawalRequestListItem[] = [];
  totalCount = 0;

  filters: WithdrawalQueryParameters = new WithdrawalQueryParameters();
  isConfirmWithdrawalRequestModalOpen: boolean = false;
  isRejectWithdrawalRequestModalOpen: boolean = false;

  rejectWithdrawalRequestData: RejectWithdrawalRequest = new RejectWithdrawalRequest();

  constructor(private paymentHttpService: PaymentHttpService,
    private toastr: ToastrService,
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

  openConfirmWithdrawalRequestModal(): void {
    this.isConfirmWithdrawalRequestModalOpen = true;
  }

  closeConfirmWithdrawalRequestModal(): void {
    this.isConfirmWithdrawalRequestModalOpen = false;
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
}
