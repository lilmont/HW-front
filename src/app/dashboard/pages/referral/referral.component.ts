import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { LoadingService } from '../../../core/services/loading.service';
import { UserHttpService } from '../../../core/services/user-http.service';
import { environment } from '../../../../environments/environment';
import { JwtHelperService } from '../../../core/services/jwt.helper.service';
import { AuthHttpService } from '../../../core/services/auth-http.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'hw-referral',
  templateUrl: './referral.component.html',
  styleUrl: './referral.component.css'
})
export class ReferralComponent implements OnInit {
  Messages = Messages;
  copied = false;
  referralLink = '';
  referralPercentage: number = 0;
  frontBaseUrl = environment.frontBaseUrl;
  teacherVideoUrl = environment.frontBaseUrl + '/academy'
  constructor(private loadingService: LoadingService,
    private userHttpService: UserHttpService,
    private jwtHelperService: JwtHelperService,
    private authHttpService: AuthHttpService
  ) { }

  ngOnInit(): void {
    this.loadingService.show();

    this.authHttpService.refreshToken().pipe(
      switchMap(() => this.userHttpService.getUserReferralCode())
    ).subscribe({
      next: (data) => {
        const userRole = this.jwtHelperService.getUser()?.role;
        this.referralLink = userRole === 'Teacher'
          ? this.teacherVideoUrl + '?ref=' + data.referralCode
          : this.frontBaseUrl + '?ref=' + data.referralCode;
        this.referralPercentage = data.referralPercentage;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  copyLicenseCommand(input: HTMLInputElement): void {
    const text = input.value;

    // Fallback for disabled input
    const tempInput = document.createElement('input');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Show "Copied" state
    this.copied = true;
    setTimeout(() => this.copied = false, 2000);
  }
}
