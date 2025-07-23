import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IUserAvatarUpdateResponse, IUserInfo } from '../../models/IUserInfo';
import { environment } from '../../../environments/environment';
import { Messages } from '../../texts/messages';
import { IJwtResponse } from '../../models/IJwtResponse';
import { JwtHelperService } from './jwt.helper.service';
import { IDiscountCodeCard } from '../../models/IDiscountCodeCard';
import { IUserComment } from '../../models/IUserComment';
import { IUserCommentList } from '../../models/IUserCommentList';
import { ISupportVideoAccess } from '../../models/ISupportVideoAccess';
import { IUserReferralCode } from '../../models/IUserReferralCode';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastService,
    private jwtHelperService: JwtHelperService) { }

  updateUserInfo(data: IUserInfo): Observable<IJwtResponse> {
    return this.http.post<any>(`${this.baseUrl}/users/update`, data).pipe(
      tap((res) => {
        if (res && res.token) {
          this.jwtHelperService.setToken(res.token);
        }
      }),
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

  getUserInfo(): Observable<IUserInfo> {
    return this.http.get<any>(`${this.baseUrl}/users/user-info`).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.toastr.error(Messages.Errors.unauthorized, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }

        return throwError(() => error);
      })
    );
  }

  uploadAvatar(data: FormData): Observable<IUserAvatarUpdateResponse> {
    return this.http.post<any>(`${this.baseUrl}/users/update-avatar`, data).pipe(
      tap((res) => {
        if (res && res.jwtResponse && res.jwtResponse.token) {
          this.jwtHelperService.setToken(res.jwtResponse.token);
        }
      }),
      catchError((error) => {
        if (error.status === 400) {
          this.toastr.error(Messages.Errors.invalidInput, Messages.Errors.error);
        } else if (error.status === 401) {
          this.toastr.error(Messages.Errors.unauthorized, Messages.Errors.error);
        } else if (error.status === 440) {
          this.toastr.error(Messages.Errors.fileSizeTooLarge, Messages.Errors.error);
        } else if (error.status === 441) {
          this.toastr.error(Messages.Errors.invalidImage, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }

        return throwError(() => error);
      })
    );
  }

  getUserDiscountCodes(): Observable<IDiscountCodeCard[]> {
    return this.http.get<IDiscountCodeCard[]>(`${this.baseUrl}/users/discount-code-list`).pipe(
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

  getUserComment(): Observable<IUserComment> {
    return this.http.get<IUserComment>(`${this.baseUrl}/users/get-user-comment`).pipe(
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

  addUserComment(data: IUserComment) {
    return this.http.post<any>(`${this.baseUrl}/users/add-user-comment`, data).pipe(
      catchError((error) => {
        if (error.status === 409) {
          this.toastr.error(Messages.Errors.commentAlreadySubmitted, Messages.Errors.error);
        } else if (error.status === 400) {
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

  editUserComment(data: IUserComment) {
    return this.http.post<any>(`${this.baseUrl}/users/update-user-comment`, data).pipe(
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

  getApprovedUserComments(count: number): Observable<IUserCommentList[]> {
    const params: any = { count: count.toString() };

    return this.http.get<IUserCommentList[]>(`${this.baseUrl}/users/user-comments-list`, { params }).pipe(
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

  hasSupportVideoAccess(): Observable<ISupportVideoAccess> {
    return this.http.get<ISupportVideoAccess>(`${this.baseUrl}/users/support-videos-access`).pipe(
      catchError((error) => {
        if (error.status === 431) {
          this.jwtHelperService.logout();
          location.href = '/';
        } else if (error.status === 400) {
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

  getUserReferralCode(): Observable<IUserReferralCode> {
    return this.http.get<any>(`${this.baseUrl}/users/user-referral-code`).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.toastr.error(Messages.Errors.unauthorized, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }

        return throwError(() => error);
      })
    );
  }
}
