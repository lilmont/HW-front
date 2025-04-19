import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ISendSignupCodeRequest } from '../../../models/SendSignupCodeRequest';
import { Messages } from '../../../texts/messages';

@Component({
  selector: 'hw-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupData: ISendSignupCodeRequest = {
    phoneNumber: ''
  };
  Messages = Messages;
  phoneInvalid = false;

  constructor(private authService: AuthService) {
  }
  sendSignupCode() {
    this.phoneInvalid = !this.isPhoneNumberValid(this.signupData.phoneNumber); // <-- validate here

    if (this.phoneInvalid) {
      return;
    }

    this.authService.sendSignupRequest(this.signupData).subscribe({
      next: () => {
        console.log("Move to confirm code page")
        // move to
      },
      error: (error) => {
        console.error('Signup failed:', error);
        // show error
      }
    });
  }

  private isPhoneNumberValid(phone: string): boolean {
    const iranPhoneStrictRegex = /^09\d{9}$/;
    return iranPhoneStrictRegex.test(phone);
  }
}
