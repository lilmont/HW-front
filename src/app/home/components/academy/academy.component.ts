import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { environment } from '../../../../environments/environment';
import { AcademyHttpService } from '../../../core/services/academy-http.service';
import { ReferralService } from '../../../core/services/referral.service';
import { AcademyLog } from '../../../models/IAcademyLog';

@Component({
  selector: 'hw-academy',
  templateUrl: './academy.component.html',
  styleUrl: './academy.component.css'
})
export class AcademyComponent implements OnInit {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;

  constructor(private academyHttpService: AcademyHttpService,
    private referralService: ReferralService
  ) { }

  ngOnInit(): void {
    const referralCode = this.referralService.getReferral();
    if (referralCode != null) {
      const log = new AcademyLog();
      log.referralUserId = referralCode;
      this.academyHttpService.watchedAcademyVideo(log).subscribe();
    }
  }
}
