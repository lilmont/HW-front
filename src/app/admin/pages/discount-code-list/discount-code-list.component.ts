import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../../core/services/loading.service';
import { Messages } from '../../../texts/messages';
import { IDiscountCodeListItem } from '../../models/IDiscountCodeListItem';
import { DiscountCodeQueryParameters } from '../../models/IDiscountCodeQueryParameters';
import { DiscountCodeHttpService } from '../../services/discount-code-http.service';

@Component({
  selector: 'hw-discount-code-list',
  templateUrl: './discount-code-list.component.html',
  styleUrl: './discount-code-list.component.css'
})
export class DiscountCodeListComponent {
  Messages = Messages;
  discountCodes: IDiscountCodeListItem[] = [];
  totalCount = 0;

  filters: DiscountCodeQueryParameters = new DiscountCodeQueryParameters();

  constructor(private discountCodeHttpService: DiscountCodeHttpService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadDiscountCodes();
  }

  loadDiscountCodes() {
    this.loadingService.show();
    this.discountCodeHttpService.getPagedDiscountCodes(this.filters).subscribe({
      next: (response) => {
        if (response.success) {
          this.discountCodes = response.data.items;
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
    this.loadDiscountCodes();
  }

  resetFilters() {
    this.filters.reset();
    this.loadDiscountCodes();
  }
  deleteDiscountCode(id: number) { }
}
