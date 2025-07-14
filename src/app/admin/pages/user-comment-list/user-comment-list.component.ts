import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { UserCommentQueryParameters } from '../../models/IUserCommentQueryParameters';
import { UserHttpService } from '../../services/user-http.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../../core/services/loading.service';
import { IUserCommentListItem } from '../../models/IUserCommentListItem';

@Component({
  selector: 'hw-user-comment-list',
  templateUrl: './user-comment-list.component.html',
  styleUrl: './user-comment-list.component.css'
})
export class UserCommentListComponent implements OnInit {
  Messages = Messages;
  userComments: IUserCommentListItem[] = [];
  totalCount = 0;

  filters: UserCommentQueryParameters = new UserCommentQueryParameters();

  isConfirmationModalOpen: boolean = false;

  constructor(private userHttpService: UserHttpService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadUserComments();
  }

  loadUserComments() {
    this.loadingService.show();
    this.userHttpService.getPagedUserComments(this.filters).subscribe({
      next: (response) => {
        if (response.success) {
          this.userComments = response.data.items;
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
    this.loadUserComments();
  }

  resetFilters() {
    this.filters.reset();
    this.loadUserComments();
  }

  openConfirmationModal(comment: IUserCommentListItem): void {
    this.isConfirmationModalOpen = true;
  }

  closeConfirmationModal(): void {
    this.isConfirmationModalOpen = false;
  }

}
