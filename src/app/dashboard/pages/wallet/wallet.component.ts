import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { PaymentHttpService } from '../../../core/services/payment-http.service';
import { IUserTransaction } from '../../../models/IUserTransaction';

@Component({
  selector: 'hw-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit {
  Messages = Messages;
  sessions = [];
  transactions: IUserTransaction[] = [];

  @ViewChild('topScrollbar') topScrollbar!: ElementRef;
  @ViewChild('tableContainer') tableContainer!: ElementRef;

  constructor(private paymentHttpService: PaymentHttpService,
    private cdr: ChangeDetectorRef
  ) {
  }
  ngOnInit(): void {
    this.paymentHttpService.getUserTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (error) => {
      }
    });
  }

  ngAfterViewInit(): void {
    this.paymentHttpService.getUserTransactions().subscribe({
      next: (data) => {
        this.transactions = data;

        // Trigger change detection to ensure the view is updated
        this.cdr.detectChanges();

        // Initialize scrollbar synchronization
        this.initializeScrollbars();
      },
      error: (error) => {
        console.error(error);
      }
    });
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
