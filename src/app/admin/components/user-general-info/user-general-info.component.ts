import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { Messages } from '../../../texts/messages';
import { IUserDetail, UserDetail } from '../../models/IUserDetail';
import { UserHttpService } from '../../services/user-http.service';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../core/services/toast.service';
import { TransferBalanceRequest } from '../../models/ITransferBalanceRequest';

@Component({
  selector: 'hw-user-general-info',
  templateUrl: './user-general-info.component.html',
  styleUrl: './user-general-info.component.css'
})
export class UserGeneralInfoComponent implements OnInit {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  userDetail: IUserDetail = new UserDetail();
  isTransferBalanceModalOpen: boolean = false;
  taxPercentage: number = 0;
  taxPercentageInvalid: boolean = false;
  @Input() userId: number | undefined = undefined;

  constructor(private route: ActivatedRoute,
    private loadingService: LoadingService,
    private userHttpService: UserHttpService,
    private toastr: ToastService
  ) { }

  ngOnInit() {
    if (this.userId)
      this.getUserDetail(this.userId);
  }

  getUserDetail(id: number): void {
    this.loadingService.show();
    this.userHttpService.getUserDetail(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.userDetail = response.data;
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error)
        }
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    })
  }

  onAvatarSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validImageTypes.includes(file.type)) {
        this.toastr.error(Messages.Errors.invalidImage, Messages.Errors.error);
        return;
      }

      const formData = new FormData();
      formData.append('file', file, file.name);
      this.uploadImage(formData, file.name);
    }
  }

  uploadImage(formData: FormData, fileName: string): void {
    if (this.userId) {
      formData.append('id', this.userId.toString());

      this.loadingService.show();
      this.userHttpService.uploadAvatar(formData).subscribe({
        next: (response) => {
          if (response.success) {
            this.userDetail.avatarImage = response.data;
            this.toastr.success(Messages.Success.profileAvatarUpdatedSuccessfully, '');
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
  }

  editUser(): void {
    if (!this.isEmailValid(this.userDetail.email ?? '')) {
      this.toastr.error(Messages.Errors.invalidEmail, Messages.Errors.error);
      return;
    }

    if (!this.isCardNumberValid(this.userDetail.cardNumber ?? '')) {
      this.toastr.error(Messages.Errors.invalidCardNumber, Messages.Errors.error);
      return;
    }

    if (!this.isBiographyValid(this.userDetail.biography ?? '')) {
      this.toastr.error(Messages.Errors.invalidBiography, Messages.Errors.error);
      return;
    }

    if (this.userDetail.downloadCount < 0) {
      this.toastr.error(Messages.Errors.negativeDownloadCount, Messages.Errors.error);
      return;
    }
    this.loadingService.show();

    this.userHttpService.updateUser(this.userDetail).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(Messages.Success.userUpdatedSuccessfully, '');
        } else {
          this.toastr.error(response.data ?? Messages.Errors.invalidRequest, Messages.Errors.error)
        }
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  private isEmailValid(email: string): boolean {
    if (!email) return true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  private isCardNumberValid(cardNumber: string): boolean {
    if (!cardNumber) return true;
    const cardNumberRegex = /^\d{16}$/;
    return cardNumberRegex.test(cardNumber);
  }

  private isBiographyValid(biography: string): boolean {
    return biography.length <= 500;
  }

  closeTransferBalanceModal() {
    this.taxPercentage = 0;
    this.taxPercentageInvalid = false;
    this.isTransferBalanceModalOpen = false;
  }
  openTransferBalanceModal() {
    this.isTransferBalanceModalOpen = true;
  }

  TransferBalance() {
    if (this.taxPercentage < 0 || this.taxPercentage > 100) {
      this.taxPercentageInvalid = true;
      return;
    }

    const request = new TransferBalanceRequest();
    request.userId = this.userDetail.id;
    request.taxPercentage = this.taxPercentage;

    this.loadingService.show();
    this.userHttpService.transferBalance(request).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(Messages.Success.transferBalanceSuccessful, '');
          location.reload();
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }
}
