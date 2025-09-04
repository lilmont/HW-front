import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IUserTransaction } from '../../../models/IUserTransaction';
import { Messages } from '../../../texts/messages';
import { PaymentHttpService } from '../../services/payment-http.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'hw-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrl: './user-transactions.component.css'
})
export class UserTransactionsComponent implements OnInit, AfterViewInit {
  Messages = Messages;
  transactions: IUserTransaction[] = [];
  @ViewChild('topScrollbar') topScrollbar!: ElementRef;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @Input() userId: number | undefined = undefined;

  constructor(private paymentHttpService: PaymentHttpService,
    private cdr: ChangeDetectorRef,
    private loadingService: LoadingService,
    private toastr: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.fetchUserTransactions();
  }

  ngAfterViewInit(): void {
    this.fetchUserTransactions();
  }

  fetchUserTransactions() {
    if (this.userId) {
      this.loadingService.show();
      this.paymentHttpService.getUserTransactions(this.userId).subscribe({
        next: (response) => {
          if (response.success) {
            this.transactions = response.data;
            // Trigger change detection to ensure the view is updated
            this.cdr.detectChanges();

            // Initialize scrollbar synchronization
            this.initializeScrollbars();
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
  }

  private initializeScrollbars(): void {
    if (this.topScrollbar == undefined || !this.tableContainer == undefined)
      return;

    const topScrollbarEl = this.topScrollbar.nativeElement;
    const tableContainerEl = this.tableContainer.nativeElement;

    // Set the width of the top scrollbar to match the table container
    topScrollbarEl.firstChild.style.width = `${tableContainerEl.scrollWidth}px`;

    // Synchronize scroll positions
    topScrollbarEl.addEventListener('scroll', () => {
      tableContainerEl.scrollLeft = topScrollbarEl.scrollLeft;
    });

    tableContainerEl.addEventListener('scroll', () => {
      topScrollbarEl.scrollLeft = tableContainerEl.scrollLeft;
    });
  }
}
