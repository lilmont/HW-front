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
import { ErrorNavigationService } from '../../../core/services/error-navigation-service.service';
import { Title } from '@angular/platform-browser';
import { PaymentHttpService } from '../../../core/services/payment-http.service';

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
  isPurchaseConfirmationModalOpen = false;
  checkDiscountCodeRequest: ICheckDiscountCodeRequest = new CheckDiscountCodeRequest();

  @ViewChild('videoPlayer') videoPlayer?: ElementRef<HTMLVideoElement>;

  constructor(private route: ActivatedRoute,
    private loadingService: LoadingService,
    private courseHttpService: CourseHttpService,
    private jwtHelperService: JwtHelperService,
    private router: Router,
    private toastr: ToastService,
    private errorNavigationService: ErrorNavigationService,
    private titleService: Title,
    private paymentHttpService: PaymentHttpService,
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
        this.titleService.setTitle(`${Messages.Titles.hardworker} - ${data.title}`);
        this.loadingService.hide();
      },
      error: (error) => {
        this.loadingService.hide();
        this.errorNavigationService.handleHttpError(error);
      }
    });
  }

  openVideoModal(): void {
    this.isVideoModalOpen = true;
  }

  closeVideoModal(): void {
    this.isVideoModalOpen = false;
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

  purchaseCoursePrep(): void {
    if (!this.jwtHelperService.isLoggedIn()) {
      this.openLoginModal();
      return;
    }

    if (!this.courseId || this.courseId <= 0)
      return;

    this.loadingService.show();

    this.courseHttpService.getPurchaseStatus(this.courseId).subscribe({
      next: (hasPurchased) => {
        if (hasPurchased) {
          this.isPurchaseConfirmationModalOpen = true;
          this.loadingService.hide();
        }
        else {
          this.purchaseCourse();
        }
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  purchaseCourse(): void {
    if (!this.courseId || this.courseId <= 0)
      return;

    this.checkDiscountCodeRequest.productId = this.courseId;

    this.loadingService.show();
    this.courseHttpService.purchaseCourse(this.checkDiscountCodeRequest).subscribe({
      next: () => {
        this.loadingService.hide();
        this.toastr.success(Messages.Success.purchaseCourseSuccessful, '');
        this.isPurchaseConfirmationModalOpen = false;
      },
      error: (error) => {
        if (error.status === 450) {
          this.openChgargeWalletModal();
        }
        this.isPurchaseConfirmationModalOpen = false;
        this.loadingService.hide();
      }
    });
  }

  openPurchaseConfirmationModal(): void {
    this.isPurchaseConfirmationModalOpen = true;
  }

  closePurchaseConfirmationModal(): void {
    this.isPurchaseConfirmationModalOpen = false;
  }

  openChgargeWalletModal(): void {
    this.isChargeWalletModalOpen = true;
  }

  closeChgargeWalletModal(): void {
    this.isChargeWalletModalOpen = false;
  }

  // goToPayment() {
  //   const price = this.courseDetail?.hasDiscountCode ? this.courseDetail.discountedPrice : this.courseDetail?.price;
  //   if (!price || isNaN(price)) {
  //     return;
  //   }

  //   const amountInRial = price * 10;
  //   const url = `https://zarinp.al/mazwebprog?amount=${amountInRial}`;
  //   window.open(url, '_blank');
  // }

  goToPayment() {
    const price = this.courseDetail?.hasDiscountCode ? this.courseDetail.discountedPrice : this.courseDetail?.price;
    if (!price || isNaN(price)) {
      return;
    }

    const amountInRial = price * 10;

    this.loadingService.show();
    this.paymentHttpService.getPaymentLink(amountInRial).subscribe({
      next: (data) => {
        this.loadingService.hide();
        window.open(data, '_blank');
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  ViewWebCourse() {
    this.router.navigate(['/dashboard/web-course']);
  }
}
