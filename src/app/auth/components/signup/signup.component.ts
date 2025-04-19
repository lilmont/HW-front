import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ISendSignupCodeRequest } from '../../../models/SendSignupCodeRequest';

@Component({
  selector: 'hw-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupData: ISendSignupCodeRequest = {
    phoneNumber: ''
  };

  constructor(private authService: AuthService) {

  }
  sendSignupCode() {
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
}
