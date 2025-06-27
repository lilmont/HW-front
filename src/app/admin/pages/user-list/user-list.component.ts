import { Component, OnInit } from '@angular/core';
import { UserHttpService } from '../../services/user-http.service';
import { IUserListItem } from '../../models/IUserListItem';
import { IUserQueryParameters, UserQueryParameters } from '../../models/IUserQueryParameters';
import { ToastrService } from 'ngx-toastr';
import { Messages } from '../../../texts/messages';

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
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userHttpService.getPagesUsers(this.filters).subscribe({
      next: (response) => {
        if (response.success) {
          this.users = response.data.items;
          this.totalCount = response.data.totalCount;
          // etc.
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error)
        }
      },
      error: () => {
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
