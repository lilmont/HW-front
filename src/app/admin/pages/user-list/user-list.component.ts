import { Component, OnInit } from '@angular/core';
import { UserHttpService } from '../../services/user-http.service';
import { IUserListItem } from '../../models/IUserListItem';
import { IUserQueryParameters, UserQueryParameters } from '../../models/IUserQueryParameters';
import { Messages } from '../../../texts/messages';
import { LoadingService } from '../../../core/services/loading.service';
import { IncreaseBalance } from '../../models/IIncreaseBalance';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'hw-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  Messages = Messages;
  users: IUserListItem[] = [];
  totalCount = 0;

  filters: UserQueryParameters = new UserQueryParameters();

  isIncreaseBalanceModalOpen: boolean = false;
  increaseBalanceData: IncreaseBalance = new IncreaseBalance();
  amount: string = '';
  amountInvalid: boolean = false;

  constructor(private userHttpService: UserHttpService,
    private toastr: ToastService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loadingService.show();
    this.userHttpService.getPagedUsers(this.filters).subscribe({
      next: (response) => {
        if (response.success) {
          this.users = response.data.items;
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
    this.loadUsers();
  }

  resetFilters() {
    this.filters.reset();
    this.loadUsers();
  }

  openIncreaseBalanceModal(userId: number) {
    this.increaseBalanceData.userId = userId;
    this.isIncreaseBalanceModalOpen = true;
  }
  closeIncreaseBalanceModal() {
    this.increaseBalanceData.reset();
    this.amount = '';
    this.amountInvalid = false;
    this.isIncreaseBalanceModalOpen = false;
  }

  increaseBalance() {
    this.increaseBalanceData.amount = Number(this.amount.replaceAll(',', ''))

    if (this.increaseBalanceData.amount <= 0) {
      this.amountInvalid = true;
      return;
    }

    this.loadingService.show();
    this.userHttpService.increaseUserBalance(this.increaseBalanceData).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(Messages.Success.userBalanceIncreasedSuccessfully, '');
        } else {
          this.toastr.error(response.data ?? Messages.Errors.invalidRequest, Messages.Errors.error)
        }
        this.closeIncreaseBalanceModal();
        this.loadingService.hide();
      },
      error: () => {
        this.closeIncreaseBalanceModal();
        this.loadingService.hide();
      }
    });
  }
}
