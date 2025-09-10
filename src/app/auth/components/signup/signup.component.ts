import { Component, OnInit } from '@angular/core';
import { AuthHttpService } from '../../../core/services/auth-http.service';
import { ISendSignupCodeRequest } from '../../../models/SendSignupCodeRequest';
import { Messages } from '../../../texts/messages';
import { ToastService } from '../../../core/services/toast.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoService } from '../../../core/services/user-info.service';
import { environment } from '../../../../environments/environment';
import { ReferralService } from '../../../core/services/referral.service';
import { ISendLoginCodeRequest } from '../../../models/ISendLoginCodeRequest';

@Component({
  selector: 'hw-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupData: ISendSignupCodeRequest = {
    phoneNumber: '',
    code: '',
    password: '',
    referralCode: ''
  };
  returnUrl: string = '/dashboard';
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  step: 'phone' | 'code' = 'phone';
  phoneInvalid: boolean = false;
  codeInvalid: boolean = false;
  confirmationDigits: string[] = ['', '', '', '', '', ''];
  timer: number = 120;
  timerInterval: any;
  showResendButton: boolean = false;
  loginData: ISendLoginCodeRequest = {
    emailAddress: '',
    code: ''
  };
  loginMode: 'phone' | 'email' = 'phone';
  emailInvalid: boolean = false;

  constructor(
    private authHttpService: AuthHttpService,
    private toastr: ToastService,
    public loadingService: LoadingService,
    private route: ActivatedRoute,
    private router: Router,
    private userInfoService: UserInfoService,
    private referralService: ReferralService
  ) {
  }

  //#region Send Code
  sendSignupCode() {
    this.phoneInvalid = !this.isPhoneNumberValid(this.signupData.phoneNumber);

    if (this.phoneInvalid) {
      return;
    }

    this.loadingService.show();

    this.authHttpService.sendVerificationCode(this.signupData).subscribe({
      next: (result) => {
        if (result === false) {
          this.toastr.error(Messages.Errors.smsNotSent, Messages.Errors.error);
        }
        else {
          this.step = 'code';
          this.startTimer();
        }
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  private isPhoneNumberValid(phone: string): boolean {
    const iranPhoneStrictRegex = /^09\d{9}$/;
    return iranPhoneStrictRegex.test(phone);
  }
  //#endregion Send Code

  //#region Validate Code
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';

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

    const referralCode = this.referralService.getReferral();
    if (referralCode) {
      this.signupData.referralCode = referralCode;
    }

    this.loadingService.show();

    this.authHttpService.validateVerificationCode(this.signupData).subscribe({
      next: () => {
        this.toastr.success(Messages.Success.loginSuccessful, '');
        this.loadingService.hide();
        this.userInfoService.loadUser();
        this.router.navigateByUrl(this.returnUrl);
        this.referralService.clearReferral();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  private isCodeValid(code: string): boolean {
    const sixDigitCodeRegex = /^\d{6}$/;
    return sixDigitCodeRegex.test(code);
  }

  onCodeInput(event: any): void {
    const input = event.target as HTMLInputElement;

    // Persian to English digit conversion map
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';

    let value = input.value;

    // Replace Persian digits with English equivalents
    value = value.replace(/[۰-۹]/g, (d) => englishDigits[persianDigits.indexOf(d)]);

    // Remove any non-English digit
    value = value.replace(/[^0-9]/g, '').slice(0, 6);

    input.value = value;
    this.signupData.code = value;
  }

  changeToEmailMode() {
    this.loginMode = 'email';
    this.step = 'phone';
    this.signupData.phoneNumber = '';
    this.signupData.code = '';
    this.signupData.password = '';
    this.phoneInvalid = false
  }

  changeToPhoneNumberMode() {
    this.loginMode = 'phone';
    this.step = 'phone';
    this.loginData.emailAddress = '';
    this.loginData.code = '';
    this.emailInvalid = false
  }

  sendLoginCodeByEmail() {
    this.emailInvalid = !this.isEmailValid(this.loginData.emailAddress ?? '');

    if (this.emailInvalid) {
      return;
    }

    this.loadingService.show();

    this.authHttpService.sendVerificationCodeByEmail(this.loginData).subscribe({
      next: (result) => {
        if (result === false) {
          this.toastr.error(Messages.Errors.smsNotSent, Messages.Errors.error);
        }
        else {
          this.step = 'code';
          this.startTimer();
        }
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  private isEmailValid(email: string): boolean {
    if (!email) return false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  confirmEmailCode() {
    this.codeInvalid = !this.isCodeValid(this.loginData.code);

    if (this.codeInvalid) {
      return;
    }

    this.loadingService.show();

    this.authHttpService.validateVerificationCodeByEmail(this.loginData).subscribe({
      next: () => {
        this.toastr.success(Messages.Success.loginSuccessful, '');
        this.loadingService.hide();
        this.userInfoService.loadUser();
        this.router.navigateByUrl(this.returnUrl);
        this.referralService.clearReferral();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  resendCodeByEmail() {
    this.sendLoginCodeByEmail();
    this.startTimer();
  }
}
