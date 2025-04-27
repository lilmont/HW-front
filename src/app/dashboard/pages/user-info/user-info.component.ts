import { Component } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { UserService } from '../../../core/services/user.service';
import { IUserInfo } from '../../../models/IUserInfo';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'hw-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  Messages = Messages;
  emailInvalid: boolean = false;
  cardNumberInvalid: boolean = false;
  biographyInvalid: boolean = false;
  userInfo: IUserInfo = {
    firstName: '',
    lastName: '',
    email: '',
    cardNumber: '',
    biography: ''
  };

  constructor(
    private userService: UserService,
    public loadingService: LoadingService,
    private toastr: ToastService,
  ) { }

  saveUserInfo() {
    this.emailInvalid = !this.isEmailValid(this.userInfo.email);
    this.cardNumberInvalid = !this.isCardNumberValid(this.userInfo.cardNumber);
    this.biographyInvalid = !this.isBiographyValid(this.userInfo.biography);

    if (this.emailInvalid || this.cardNumberInvalid || this.biographyInvalid) {
      return;
    }

    this.userService.updateUserInfo(this.userInfo).subscribe({
      next: () => {
        this.toastr.success(Messages.Success.saveUserInfoSuccessful, '');
        this.loadingService.hide();
      },
      error: (error) => {
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

  onCardNumberChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.userInfo.cardNumber = input.value.replace(/\D/g, '').slice(0, 16);
    input.value = this.userInfo.cardNumber;
  }

}
