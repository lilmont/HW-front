import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Messages } from '../../texts/messages';
import { ICourseSession } from '../../models/ICourseSession';
import { ICourseCardInfo } from '../../models/ICourseCardInfo';
import { ICourseDetail } from '../../models/ICourseDetail';
import { ICheckDiscountCodeResponse } from '../../models/ICheckDiscountCodeResponse';
import { ICheckDiscountCodeRequest } from '../../models/ICheckDiscountCodeRequest';
import { JwtHelperService } from './jwt.helper.service';
import { IPurchaseCourseRequest } from '../../models/IPurchaseCourseRequest';
import { IUserCourseCard } from '../../models/IUserCourseCard';

@Injectable({
  providedIn: 'root'
})
export class CourseHttpService {
  private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastService,
    private jwtHelperService: JwtHelperService
  ) { }

  getWebCourseSessions(): Observable<ICourseSession[]> {
    return this.http.get<any>(`${this.baseUrl}/courses/web-course`).pipe(
      catchError((error) => {
        if (error.status === 400) {
          this.toastr.error(Messages.Errors.invalidInput, Messages.Errors.error);
        } else if (error.status === 401) {
          this.toastr.error(Messages.Errors.unauthorized, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }
        return throwError(() => error);
      })
    );
  }

  getSessionDownloadLink(sessionId: number): Observable<string> {
    return this.http.get<any>(`${this.baseUrl}/courses/get-download-link`, { params: { sessionId: sessionId.toString() } }).pipe(
      map((response: any) => response.link),
      catchError((error) => {
        if (error.status === 431) {
          this.jwtHelperService.logout();
          location.href = '/';
        } else if (error.status === 430) {
          this.toastr.error(Messages.Errors.uploadSessionExercise, Messages.Errors.error);
        } else if (error.status === 450) {
          this.toastr.error(Messages.Errors.installmentNotPaid, Messages.Errors.error);
        } else if (error.status === 451) {
          this.toastr.error(Messages.Errors.outOfDownloadCharge, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }
        return throwError(() => error);
      })
    );
  }

  getAllCourses(): Observable<ICourseCardInfo[]> {
    return this.http.get<any>(`${this.baseUrl}/courses/courses-list`).pipe(
      catchError((error) => {
        if (error.status === 400) {
          this.toastr.error(Messages.Errors.invalidInput, Messages.Errors.error);
        } else if (error.status === 401) {
          this.toastr.error(Messages.Errors.unauthorized, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }
        return throwError(() => error);
      })
    );
  }

  getCourseDetail(id: number, title: string): Observable<ICourseDetail> {
    return this.http.get<any>(`${this.baseUrl}/courses/course-detail`, { params: { id: id.toString(), title: title } }).pipe(
      catchError((error) => {
        if (error.status === 400) {
          this.toastr.error(Messages.Errors.invalidInput, Messages.Errors.error);
        } else if (error.status === 401) {
          this.toastr.error(Messages.Errors.unauthorized, Messages.Errors.error);
        } else if (error.status === 404) {
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }
        return throwError(() => error);
      })
    );
  }

  checkDiscountCode(checkDiscountCodeRequest: ICheckDiscountCodeRequest): Observable<ICheckDiscountCodeResponse> {
    return this.http.post<any>(`${this.baseUrl}/courses/check-discount-code`, checkDiscountCodeRequest).pipe(
      catchError((error) => {
        if (error.status === 404) {
          this.toastr.error(Messages.Errors.discountCodeNotFound, Messages.Errors.error);
        } else if (error.status === 409) {
          this.toastr.error(Messages.Errors.discountCodeAlreadyUsed, Messages.Errors.error);
        } else if (error.status === 401) {
          this.toastr.error(Messages.Errors.unauthorized, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }
        return throwError(() => error);
      })
    );
  }

  purchaseCourse(purchaseCourseRequest: IPurchaseCourseRequest) {
    return this.http.post<any>(`${this.baseUrl}/courses/purchase-course`, purchaseCourseRequest).pipe(
      catchError((error) => {
        if (error.status === 431) {
          this.jwtHelperService.logout();
          location.href = '/';
        } else if (error.status === 404) {
          this.toastr.error(Messages.Errors.discountCodeNotFound, Messages.Errors.error);
        } else if (error.status === 409) {
          this.toastr.error(Messages.Errors.discountCodeAlreadyUsed, Messages.Errors.error);
        } else if (error.status === 401) {
          this.toastr.error(Messages.Errors.unauthorized, Messages.Errors.error);
        } else if (error.status === 450) {
        }
        else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }
        return throwError(() => error);
      })
    );
  }

  getAllUserCourses(): Observable<IUserCourseCard[]> {
    return this.http.get<any>(`${this.baseUrl}/courses/user-courses`).pipe(
      catchError((error) => {
        if (error.status === 400) {
          this.toastr.error(Messages.Errors.invalidInput, Messages.Errors.error);
        } else if (error.status === 401) {
          this.toastr.error(Messages.Errors.unauthorized, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }
        return throwError(() => error);
      })
    );
  }
}
