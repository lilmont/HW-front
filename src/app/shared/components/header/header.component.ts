import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ISignupRequest, SignupRequest } from '../../../models/ISignupRequest';
import { IJwtResponse } from '../../../models/IJwtResponse';

@Component({
  selector: 'hw-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  signupData: ISignupRequest = new SignupRequest();
  constructor(private authService: AuthService) {

  }
  Test() {
    this.signupData.phoneNumber = '09134041806';
    this.signupData.password = '123@Niloo';
    this.authService.signup(this.signupData).subscribe({
      next: (response: IJwtResponse) => {
        console.log('Signup successful!', response);
        // maybe store the token or navigate to another page
      },
      error: (error) => {
        console.error('Signup failed:', error);
      }
    });
  }
}
