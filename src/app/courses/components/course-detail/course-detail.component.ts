import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Messages } from '../../../texts/messages';
import { LoadingService } from '../../../core/services/loading.service';
import { CourseHttpService } from '../../../core/services/course-http.service';
import { ICourseDetail } from '../../../models/ICourseDetail';
import { environment } from '../../../../environments/environment';
import { CheckDiscountCodeRequest, ICheckDiscountCodeRequest } from '../../../models/ICheckDiscountCodeRequest';
import { ICheckDiscountCodeResponse } from '../../../models/ICheckDiscountCodeResponse';

@Component({
  selector: 'hw-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  courseId?: number = undefined;
  courseSlug?: string = undefined;
  courseDetail?: ICourseDetail = undefined;
  isVideoModalOpen = false;
  checkDiscountCodeRequest: ICheckDiscountCodeRequest = new CheckDiscountCodeRequest();
  checkDiscountCodeResponse!: ICheckDiscountCodeResponse;
  discountApplied = false;
  discountedPrice: number | null = null;
  discountCodeInvalid: boolean = false;

  @ViewChild('videoPlayer') videoPlayer?: ElementRef<HTMLVideoElement>;

  constructor(private route: ActivatedRoute,
    private loadingService: LoadingService,
    private courseHttpService: CourseHttpService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseId = Number(params.get('id'));
      this.courseSlug = params.get('courseSlug') || '';
    });

    if (this.courseId)
      this.getCourseDetail(this.courseId);
  }

  getCourseDetail(id: number): void {
    this.loadingService.show();
    this.courseHttpService.getCourseDetail(id).subscribe({
      next: (data) => {
        this.courseDetail = data;
        this.loadingService.hide();
      },
      error: () => {
        this.discountApplied = false;
        this.discountedPrice = null;
        this.loadingService.hide();
      }
    });
  }

  openVideoModal(): void {
    this.isVideoModalOpen = true;
  }

  closeVideoModal(): void {
    this.isVideoModalOpen = false;
    // pause video when modal closes
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.pause();
      this.videoPlayer.nativeElement.currentTime = 0;
    }
  }

  checkDiscountCode(): void {
    if (!this.courseId || this.courseId <= 0)
      return;

    this.checkDiscountCodeRequest.code = this.sanitizeAndValidateDiscountCode(this.checkDiscountCodeRequest.code, 3);
    if (!this.checkDiscountCodeRequest.code) {
      this.discountCodeInvalid = true;
      return;
    }

    this.checkDiscountCodeRequest.productId = this.courseId;

    this.loadingService.show();
    this.courseHttpService.checkDiscountCode(this.checkDiscountCodeRequest).subscribe({
      next: (response) => {
        this.discountedPrice = response.discountedPrice;
        this.discountApplied = true;
        this.checkDiscountCodeResponse = response;
        this.discountCodeInvalid = false;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  sanitizeAndValidateDiscountCode(code: string, minLength = 3): string {
    if (!code) return '';

    // Trim whitespace
    let sanitizedCode = code.trim();

    // Convert to uppercase
    sanitizedCode = sanitizedCode.toUpperCase();

    // Remove any non-alphanumeric characters
    sanitizedCode = sanitizedCode.replace(/[^A-Z0-9]/g, '');

    // Validate length
    if (sanitizedCode.length < minLength) {
      return '';
    }

    return sanitizedCode;
  }
}
