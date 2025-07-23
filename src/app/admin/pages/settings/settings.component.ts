import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../../core/services/loading.service';
import { CommonHttpService } from '../../services/common-http.service';
import { ToastService } from '../../../core/services/toast.service';
import { IWebsiteSettings } from '../../models/IWebsiteSettings';

@Component({
  selector: 'hw-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  settingsForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private loadingService: LoadingService,
    private commonHttpService: CommonHttpService,
    private toastr: ToastService
  ) { }

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      referralPercentage: [0, [Validators.required, Validators.min(0)]],
    });

    this.getWebsiteSettings();
  }

  getWebsiteSettings(): void {
    this.loadingService.show();
    this.commonHttpService.getWebsiteSettings().subscribe({
      next: (response) => {
        if (response.success) {
          const websiteSettings = response.data;

          this.settingsForm.patchValue({
            referralPercentage: websiteSettings.referralPercentage,
          });

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

  EditSettings() {
    if (this.settingsForm.invalid) {
      this.settingsForm.markAllAsTouched();
      return;
    }

    const formValues = this.settingsForm.value;

    const payload: IWebsiteSettings = {
      referralPercentage: formValues.referralPercentage
    };

    this.loadingService.show();
    this.commonHttpService.editWebsiteSettings(payload).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(Messages.Success.websiteSettingEditedSuccessfully, '');
          location.reload();
        } else {
          this.toastr.error(response.data ?? Messages.Errors.invalidRequest, Messages.Errors.error)
        }
        this.loadingService.hide();
      },
      error: () => {

        this.loadingService.hide();
      },
    });
  }
}
