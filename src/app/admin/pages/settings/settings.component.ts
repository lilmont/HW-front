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
  carouselImages: string[] = [];


  constructor(private fb: FormBuilder,
    private loadingService: LoadingService,
    private commonHttpService: CommonHttpService,
    private toastr: ToastService
  ) { }

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      courseReferralPercentage: [0, [Validators.required, Validators.min(0)]],
      hostingPlanReferralPercentage: [0, [Validators.required, Validators.min(0)]],
      freeDomain: ['', Validators.required],
    });

    this.getWebsiteSettings();
    this.getCarouselImages();
  }

  getWebsiteSettings(): void {
    this.loadingService.show();
    this.commonHttpService.getWebsiteSettings().subscribe({
      next: (response) => {
        if (response.success) {
          const websiteSettings = response.data;

          this.settingsForm.patchValue({
            courseReferralPercentage: websiteSettings.courseReferralPercentage,
            hostingPlanReferralPercentage: websiteSettings.hostingPlanReferralPercentage,
            freeDomain: websiteSettings.freeDomain,
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
      courseReferralPercentage: formValues.courseReferralPercentage,
      hostingPlanReferralPercentage: formValues.hostingPlanReferralPercentage,
      freeDomain: formValues.freeDomain
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

  getCarouselImages() {
    this.loadingService.show();
    this.commonHttpService.getCarouselImages().subscribe({
      next: (response) => {
        this.carouselImages = response.map(c => this.baseUrl + '/uploads/carousel/' + c);
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  handleSave(images: (string | File)[]) {
    const formData = new FormData();
    for (const img of images) {
      if (img instanceof File) {
        formData.append('newImages', img);
      } else {
        formData.append('existingImages', img.split("/").pop() ?? '');
      }
    }

    this.loadingService.show();

    this.commonHttpService.EditCarouselImages(formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(Messages.Success.carouselImagesEditedSuccessfully);
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
