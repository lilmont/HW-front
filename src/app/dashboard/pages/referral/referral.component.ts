import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { LoadingService } from '../../../core/services/loading.service';
import { UserHttpService } from '../../../core/services/user-http.service';
import { environment } from '../../../../environments/environment';

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
  constructor(private loadingService: LoadingService,
    private userHttpService: UserHttpService
  ) { }

  ngOnInit(): void {
    this.getUserReferralCode();
  }

  getUserReferralCode() {
    this.loadingService.show();
    this.userHttpService.getUserReferralCode().subscribe({
      next: (data) => {
        this.referralLink = this.frontBaseUrl + '?ref=' + data.referralCode;
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
