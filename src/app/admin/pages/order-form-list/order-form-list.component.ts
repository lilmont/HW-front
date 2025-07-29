import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { IOrderMessageListItem } from '../../models/IOrderMessageListItem';
import { CommonHttpService } from '../../services/common-http.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastService } from '../../../core/services/toast.service';
import { OrderMessageQueryParameters } from '../../models/IOrderMessageQueryParameters';

@Component({
  selector: 'hw-order-form-list',
  templateUrl: './order-form-list.component.html',
  styleUrl: './order-form-list.component.css'
})
export class OrderFormListComponent implements OnInit {
  Messages = Messages;
  orderMessages: IOrderMessageListItem[] = [];
  isMessageModalOpen: boolean = false;
  selectedMessage?: IOrderMessageListItem;
  filters: OrderMessageQueryParameters = new OrderMessageQueryParameters();
  totalCount = 0;

  constructor(private commonHttpService: CommonHttpService,
    private loadingService: LoadingService,
    private toastr: ToastService,
  ) { }

  ngOnInit() {
    this.loadOrderMessages();
  }

  loadOrderMessages() {
    this.loadingService.show();
    this.commonHttpService.getOrderMessages(this.filters).subscribe({
      next: (response) => {
        if (response.success) {
          this.orderMessages = response.data.items;
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

  openMessageModal(message: IOrderMessageListItem | undefined) {
    this.selectedMessage = message;
    this.isMessageModalOpen = true;
  }
  closeMessageModal() {
    this.selectedMessage = undefined;
    this.isMessageModalOpen = false;
  }

  onPageChange(page: any) {
    this.filters.pageNumber = page;
    this.loadOrderMessages();
  }
}
