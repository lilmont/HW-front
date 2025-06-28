import { Component, OnInit } from '@angular/core';
import { UserHttpService } from '../../services/user-http.service';
import { IUserListItem } from '../../models/IUserListItem';
import { IUserQueryParameters, UserQueryParameters } from '../../models/IUserQueryParameters';
import { ToastrService } from 'ngx-toastr';
import { Messages } from '../../../texts/messages';
import { LoadingService } from '../../../core/services/loading.service';

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

  constructor(private userHttpService: UserHttpService,
    private toastr: ToastrService,
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
}
