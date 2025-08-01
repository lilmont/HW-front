import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { UserCommentQueryParameters } from '../../models/IUserCommentQueryParameters';
import { UserHttpService } from '../../services/user-http.service';
import { LoadingService } from '../../../core/services/loading.service';
import { IUserCommentListItem } from '../../models/IUserCommentListItem';
import { UserCommentApproval } from '../../models/IUserCommentApproval';
import { ToastService } from '../../../core/services/toast.service';

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
  selectedUserComment?: IUserCommentListItem = undefined;
  userCommentApproval: UserCommentApproval = new UserCommentApproval();

  constructor(private userHttpService: UserHttpService,
    private toastr: ToastService,
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
    this.selectedUserComment = comment;
    this.userCommentApproval.id = comment.id;
    this.isConfirmationModalOpen = true;
  }

  closeConfirmationModal(): void {
    this.selectedUserComment = undefined;
    this.userCommentApproval.id = 0;
    this.isConfirmationModalOpen = false;
  }

  approveUserComment() {
    this.loadingService.show();
    this.userHttpService.approveUserComment(this.userCommentApproval).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(Messages.Success.userCommentApprovedSuccessfully, '');
          this.loadUserComments();
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }
        this.closeConfirmationModal();
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
        this.closeConfirmationModal();
      }
    });
  }
  disapproveUserComment() {
    this.loadingService.show();
    this.userHttpService.disapproveUserComment(this.userCommentApproval).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(Messages.Success.userCommentDisapprovedSuccessfully, '');
          this.loadUserComments();
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }
        this.closeConfirmationModal();
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
        this.closeConfirmationModal();
      }
    });
  }

  editUserComment() {
    if (this.selectedUserComment) {
      this.loadingService.show();
      this.userHttpService.editUserComment(this.selectedUserComment).subscribe({
        next: (response) => {
          if (response.success) {
            this.toastr.success(Messages.Success.userCommentEdittedSuccessfully, '');
            this.loadUserComments();
          } else {
            this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
          }
          this.closeConfirmationModal();
          this.loadingService.hide();
        },
        error: () => {
          this.loadingService.hide();
          this.closeConfirmationModal();
        }
      });
    }
  }
}
