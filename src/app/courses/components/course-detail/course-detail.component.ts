import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages } from '../../../texts/messages';
import { LoadingService } from '../../../core/services/loading.service';
import { CourseHttpService } from '../../../core/services/course-http.service';
import { ICourseDetail } from '../../../models/ICourseDetail';
import { environment } from '../../../../environments/environment';
import { CheckDiscountCodeRequest, ICheckDiscountCodeRequest } from '../../../models/ICheckDiscountCodeRequest';
import { ICheckDiscountCodeResponse } from '../../../models/ICheckDiscountCodeResponse';
import { JwtHelperService } from '../../../core/services/jwt.helper.service';
import { ToastService } from '../../../core/services/toast.service';

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
  isLoginModalOpen = false;
  isChargeWalletModalOpen = false;
  checkDiscountCodeRequest: ICheckDiscountCodeRequest = new CheckDiscountCodeRequest();
  checkDiscountCodeResponse!: ICheckDiscountCodeResponse;
  discountApplied = false;
  discountedPrice: number | null = null;
  discountCodeInvalid: boolean = false;

  @ViewChild('videoPlayer') videoPlayer?: ElementRef<HTMLVideoElement>;

  constructor(private route: ActivatedRoute,
    private loadingService: LoadingService,
    private courseHttpService: CourseHttpService,
    private jwtHelperService: JwtHelperService,
    private router: Router,
    private toastr: ToastService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseId = Number(params.get('id'));
      this.courseSlug = params.get('courseSlug') || '';
    });

    if (this.courseId && this.courseSlug)
      this.getCourseDetail(this.courseId, this.courseSlug.replaceAll('-', ' '));
  }

  getCourseDetail(id: number, title: string): void {
    this.loadingService.show();
    this.courseHttpService.getCourseDetail(id, title).subscribe({
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

  openLoginModal(): void {
    this.isLoginModalOpen = true;
  }

  closeLoginModal(): void {
    this.isLoginModalOpen = false;
  }

  goToLoginSignup(): void {
    this.router.navigate(['/users/signup'], { queryParams: { returnUrl: this.router.url } });
  }

  checkDiscountCode(): void {
    if (!this.jwtHelperService.isLoggedIn()) {
      this.openLoginModal();
      return;
    }

    if (!this.courseId || this.courseId <= 0)
      return;

    const sanitizedCode = this.sanitizeAndValidateDiscountCode(this.checkDiscountCodeRequest.code, 3);
    if (!sanitizedCode) {
      this.discountCodeInvalid = true;
      return;
    }
    this.checkDiscountCodeRequest.code = sanitizedCode;

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

  purchaseCourse(): void {
    if (!this.jwtHelperService.isLoggedIn()) {
      this.openLoginModal();
      return;
    }

    if (!this.courseId || this.courseId <= 0)
      return;

    this.checkDiscountCodeRequest.productId = this.courseId;

    if (this.checkDiscountCodeRequest.code) {
      const sanitizedCode = this.sanitizeAndValidateDiscountCode(this.checkDiscountCodeRequest.code, 3);
      if (!sanitizedCode) {
        this.discountCodeInvalid = true;
        return;
      }
      this.checkDiscountCodeRequest.code = sanitizedCode;

      this.courseHttpService.checkDiscountCode(this.checkDiscountCodeRequest).subscribe({
        next: (response) => {
          this.discountedPrice = response.discountedPrice;
          this.discountApplied = true;
          this.checkDiscountCodeResponse = response;
          this.discountCodeInvalid = false;
        },
        error: () => {
        }
      });
    }

    this.loadingService.show();
    this.courseHttpService.purchaseCourse(this.checkDiscountCodeRequest).subscribe({
      next: () => {
        this.loadingService.hide();
        this.toastr.success(Messages.Success.purchaseCourseSuccessful, '');
      },
      error: (error) => {
        if (error.status === 450) {
          this.openChgargeWalletModal();
        }
        this.loadingService.hide();
      }
    });
  }

  openChgargeWalletModal(): void {
    this.isChargeWalletModalOpen = true;
  }

  closeChgargeWalletModal(): void {
    this.isChargeWalletModalOpen = false;
  }

  goToPayment() {
    const price = this.discountApplied ? this.discountedPrice : this.courseDetail?.price;
    if (!price || isNaN(price)) {
      return;
    }

    const amountInRial = price * 10;
    const url = `https://zarinp.al/mazwebprog?amount=${amountInRial}`;
    window.open(url, '_blank');
  }
}
