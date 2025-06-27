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
}
