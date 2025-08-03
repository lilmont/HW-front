import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Messages } from '../../../texts/messages';

@Component({
  selector: 'hw-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  Messages = Messages;
  @Input() pageNumber = 1;
  @Input() pageSize = 10;
  @Input() totalCount = 0;

  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  get paginationRange(): (number | string)[] {
    const total = this.totalPages;
    const current = this.pageNumber;
    const delta = 2; // how many pages to show around current

    const range: (number | string)[] = [];
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1); // always show first page

    if (left > 2) range.push('...');

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < total - 1) range.push('...');

    if (total > 1) range.push(total); // always show last page

    return range;
  }
}
