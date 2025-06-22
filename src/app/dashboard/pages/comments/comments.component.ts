import { Component, OnInit } from '@angular/core';
import { IUserComment } from '../../../models/IUserComment';
import { Messages } from '../../../texts/messages';
import { UserHttpService } from '../../../core/services/user-http.service';
import { LoadingService } from '../../../core/services/loading.service';
import { UserInfoService } from '../../../core/services/user-info.service';
import { environment } from '../../../../environments/environment';
import { IUserInfo } from '../../../models/IUserInfo';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'hw-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  userComment: IUserComment = { commentText: '', isApproved: false };
  userInfo: IUserInfo = {
    firstName: '',
    lastName: '',
    avatarImage: ''
  }
  hasUserAlreaduSubmittedComment: boolean = false;
  commentTextInvalid: boolean = false;
  private subscription!: Subscription;

  constructor(private userHttpService: UserHttpService,
    private loadingService: LoadingService,
    private userInfoService: UserInfoService,
    private toastr: ToastrService
  ) {
    this.userInfoService.loadUser();
  }

  ngOnInit(): void {
    this.getUserComment();
    this.userInfoService.loadUser();
    this.subscription = this.userInfoService.user$.subscribe(user => {
      if (user) {
        this.userInfo.avatarImage = user.avatarImage ?? '';
        this.userInfo.firstName = user.firstName ?? '';
        this.userInfo.lastName = user.lastName ?? '';
      }
    });
  }

  getUserComment(): void {
    this.loadingService.show();
    this.userHttpService.getUserComment().subscribe({
      next: (data) => {
        console.log("data", data);
        if (data != null) {
          this.userComment = data;
          this.hasUserAlreaduSubmittedComment = true;
        }

        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  addUserComment() {
    this.loadingService.show();
    this.userHttpService.addUserComment(this.userComment).subscribe({
      next: () => {
        this.hasUserAlreaduSubmittedComment = true;
        this.loadingService.hide();
        this.toastr.success(Messages.Success.commentSubmittedSuccessfully, '');
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }
}
