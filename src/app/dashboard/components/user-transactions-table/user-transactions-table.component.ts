import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { IUserTransaction } from '../../../models/IUserTransaction';
import { PaymentHttpService } from '../../../core/services/payment-http.service';
import { LoadingService } from '../../../core/services/loading.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hw-user-transactions-table',
  templateUrl: './user-transactions-table.component.html',
  styleUrl: './user-transactions-table.component.css'
})
export class UserTransactionsTableComponent implements OnInit, AfterViewInit, OnDestroy {
  Messages = Messages;
  sessions = [];
  transactions: IUserTransaction[] = [];
  private transactionSubscription: Subscription | null = null;

  @ViewChild('topScrollbar') topScrollbar!: ElementRef;
  @ViewChild('tableContainer') tableContainer!: ElementRef;

  constructor(private paymentHttpService: PaymentHttpService,
    private cdr: ChangeDetectorRef,
    private loadingService: LoadingService,
    private transactionService: TransactionService
  ) {
  }
  ngOnInit(): void {
    this.transactionSubscription = this.transactionService.transactionSubmitted$.subscribe(() => {
      this.fetchUserTransactions();
    });
  }

  ngOnDestroy() {
    if (this.transactionSubscription) {
      this.transactionSubscription.unsubscribe();
    }
  }

  fetchUserTransactions() {
    this.loadingService.show();
    this.paymentHttpService.getUserTransactions().subscribe({
      next: (data) => {
        this.transactions = data;

        // Trigger change detection to ensure the view is updated
        this.cdr.detectChanges();

        // Initialize scrollbar synchronization
        this.initializeScrollbars();
        this.loadingService.hide();
      },
      error: (error) => {
        console.error(error);
        this.loadingService.hide();
      }
    });
  }

  ngAfterViewInit(): void {
    this.fetchUserTransactions();
  }

  private initializeScrollbars(): void {
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
