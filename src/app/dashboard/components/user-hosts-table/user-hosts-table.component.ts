import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { IUserHost } from '../../../models/IUserHost';

@Component({
  selector: 'hw-user-hosts-table',
  templateUrl: './user-hosts-table.component.html',
  styleUrl: './user-hosts-table.component.css'
})
export class UserHostsTableComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.initializeScrollbars();
  }
  Messages = Messages;
  @Input() userHosts: IUserHost[] = [];

  @ViewChild('topScrollbar') topScrollbar!: ElementRef;
  @ViewChild('tableContainer') tableContainer!: ElementRef;

  submitDomain() {

  }

  showExtendBtn(host: IUserHost): boolean {
    if (host.status != 2 && host.paymentStatus == 2) {
      return true;
    }
    return false;
  }

  showRestoreBtn(host: IUserHost): boolean {
    if (host.status != 2) {
      return true;
    }
    return false;
  }

  showInstallmentPayBtn(host: IUserHost): boolean {
    if (host.status != 2 && host.paymentStatus == 1) {
      return true;
    }
    return false;
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
