import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ISendSignupCodeRequest } from '../../../models/SendSignupCodeRequest';
import { Messages } from '../../../texts/messages';
import { ToastService } from '../../../core/services/toast.service';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'hw-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupData: ISendSignupCodeRequest = {
    phoneNumber: '',
    code: '',
    password: ''
  };
  Messages = Messages;
  step: 'phone' | 'code' | 'password' = 'phone';
  phoneInvalid: boolean = false;
  codeInvalid: boolean = false;
  confirmationDigits: string[] = ['', '', '', '', '', ''];
  timer: number = 120;
  timerInterval: any;
  showResendButton: boolean = false;
  showPassword: boolean = false;
  passwordInvalid: boolean = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastService,
    public loadingService: LoadingService) {
  }

  //#region Validate Code
  ngOnInit(): void {
    if (this.step === 'code') {
      this.startTimer();
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  startTimer() {
    this.showResendButton = false;
    this.timer = 120;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.timerInterval);
        this.showResendButton = true;
      }
    }, 1000);
  }


  resendCode() {
    this.sendSignupCode();
    this.startTimer();
  }

  confirmCode() {
    this.codeInvalid = !this.isCodeValid(this.signupData.code);

    if (this.codeInvalid) {
      return;
    }

    this.loadingService.show();

    this.authService.validateSignupCode(this.signupData).subscribe({
      next: () => {
        this.step = 'password';
        this.loadingService.hide();
      },
      error: (error) => {
        this.loadingService.hide();
      }
    });
  }

  private isCodeValid(code: string): boolean {
    const sixDigitCodeRegex = /^\d{6}$/;
    return sixDigitCodeRegex.test(code);
  }
  //#endregion Validate Code

  //#region Send Code
  sendSignupCode() {
    this.phoneInvalid = !this.isPhoneNumberValid(this.signupData.phoneNumber);

    if (this.phoneInvalid) {
      return;
    }

    this.loadingService.show();

    this.authService.sendSignupRequest(this.signupData).subscribe({
      next: () => {
        this.step = 'code';
        this.loadingService.hide();
        this.startTimer();
      },
      error: (error) => {
        this.loadingService.hide();
      }
    });
  }

  private isPhoneNumberValid(phone: string): boolean {
    const iranPhoneStrictRegex = /^09\d{9}$/;
    return iranPhoneStrictRegex.test(phone);
  }
  //#endregion Send Code

  //#region Set Password
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  setPassword() {
    this.passwordInvalid = !this.isPasswordValid(this.signupData.password);

    if (this.passwordInvalid) {
      return;
    }

    this.loadingService.show();

    this.authService.Signup(this.signupData).subscribe({
      next: (result) => {
        this.loadingService.hide();
      },
      error: (error) => {
        this.loadingService.hide();
      }
    });
  }

  isPasswordValid(password: string): boolean {
    return password.length >= 6;
  }
}
