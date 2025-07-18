import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../../core/services/loading.service';
import { CommonHttpService } from '../../services/common-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'hw-support-video-detail',
  templateUrl: './support-video-detail.component.html',
  styleUrl: './support-video-detail.component.css'
})
export class SupportVideoDetailComponent implements OnInit, OnDestroy {
  isAddMode: boolean = true;
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  videoForm!: FormGroup;
  videoId?: number = undefined;
  videoPreviewUrl?: string;

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private commonHttpService: CommonHttpService,
    private toastr: ToastService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.videoForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      videoType: [0, Validators.required],

      video: [''],
      videoFile: [null]
    });

    this.route.paramMap.subscribe(params => {
      this.videoId = Number(params.get('id'));
      this.isAddMode = !this.videoId;

      const videoFileCtrl = this.videoForm.get('videoFile');

      if (this.isAddMode) {
        videoFileCtrl?.setValidators(Validators.required);
      } else {
        videoFileCtrl?.clearValidators();
      }

      videoFileCtrl?.updateValueAndValidity();

      if (!this.isAddMode) {
        this.getVideoDetail(this.videoId);
      }
    });
  }

  getVideoDetail(id: number): void {
    this.loadingService.show();
    this.commonHttpService.getSupportVideoDetail(id).subscribe({
      next: (response) => {
        if (response.success) {
          const video = response.data;

          // Populate simple fields
          this.videoForm.patchValue({
            id: video.id,
            title: video.title,
            video: video.video,
            videoType: video.videoType
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

  get videoUrl(): string {
    return this.videoPreviewUrl
      ? this.videoPreviewUrl
      : `${this.baseUrl}/uploads/support/videos/${this.videoForm.get('video')?.value}`;
  }

  onVideoSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.videoPreviewUrl = undefined;
      this.videoForm.get('videoFile')?.setValue(null);
      return;
    }

    const file = input.files[0];

    // Revoke previous preview URL if it exists
    if (this.videoPreviewUrl) {
      URL.revokeObjectURL(this.videoPreviewUrl);
    }

    // Create a preview URL from the file
    this.videoPreviewUrl = URL.createObjectURL(file);
    this.videoForm.get('videoFile')?.setValue(file);
    this.cdr.detectChanges();
  }

  // Cleanup object URL when component is destroyed
  ngOnDestroy(): void {
    if (this.videoPreviewUrl) {
      URL.revokeObjectURL(this.videoPreviewUrl);
    }
  }

  AddOrEditVideo() {
    if (this.videoForm.invalid) {
      this.videoForm.markAllAsTouched();
      return;
    }

    const formValues = this.videoForm.value;
    const formData = new FormData();

    formData.append('Id', formValues.id ?? '');
    formData.append('Title', formValues.title);
    formData.append('VideoType', formValues.videoType.toString());

    if (this.videoForm.get('videoFile')) {
      formData.append('videoFile', this.videoForm.get('videoFile')?.value);
    }

    this.loadingService.show();

    const apiCall = this.isAddMode
      ? this.commonHttpService.addVideo(formData)
      : this.commonHttpService.editVideo(formData);

    apiCall.subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(this.isAddMode ? Messages.Success.videoAddedSuccessfully : Messages.Success.videoEditedSuccessfully, '');
          if (this.isAddMode)
            this.router.navigate(['/mazmon/support-videos']);
          else
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
