import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IJwtResponse } from '../../models/IJwtResponse';
import { ISendSignupCodeRequest } from '../../models/SendSignupCodeRequest';
import { Messages } from '../../texts/messages';
import { ToastService } from './toast.service';
import { JwtHelperService } from './jwt.helper.service';
import { ISendLoginAsUserCodeRequest } from '../../models/ISendLoginAsUserCodeRequest';
import { ISendLoginCodeRequest } from '../../models/ISendLoginCodeRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  private baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private toastr: ToastService,
    private jwtHelperService: JwtHelperService) { }

  sendVerificationCode(data: ISendSignupCodeRequest): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/auth/verification-code`, data).pipe(
      catchError((error) => {
        if (error.status === 409) {
          this.toastr.error(Messages.Errors.tooManyRequests, Messages.Errors.error);
        } else if (error.status === 431) {
          this.toastr.error(Messages.Errors.accessLimited, Messages.Errors.error);
        } else if (error.status === 400) {
          this.toastr.error(Messages.Errors.invalidRequest + ' ' + error.status, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest + ' ' + error.status, Messages.Errors.error);
        }

        return throwError(() => error);
      })
    );
  }
  validateVerificationCode(data: ISendSignupCodeRequest): Observable<IJwtResponse> {
    return this.http.post<IJwtResponse>(`${this.baseUrl}/auth/validate-verification-code`, data).pipe(
      tap((res) => {
        if (res && res.token) {
          this.jwtHelperService.setToken(res.token);
        }
      }),
      catchError((error) => {
        if (error.status === 429) {
          this.toastr.error(Messages.Errors.wrongValidationCode, Messages.Errors.error);
        } else if (error.status === 400) {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }

        return throwError(() => error);
      })
    );
  }

  sendVerificationCodeToAdmin(data: ISendLoginAsUserCodeRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/admin-verification-code`, data).pipe(
      catchError((error) => {
        if (error.status === 429) {
          this.toastr.error(Messages.Errors.tooManyRequests, Messages.Errors.error);
        } else if (error.status === 400) {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }

        return throwError(() => error);
      })
    );
  }

  validateVerificationCodeToAdmin(data: ISendLoginAsUserCodeRequest): Observable<IJwtResponse> {
    return this.http.post<IJwtResponse>(`${this.baseUrl}/auth/validate-verification-code-to-admin`, data).pipe(
      tap((res) => {
        if (res && res.token) {
          this.jwtHelperService.setToken(res.token);
        }
      }),
      catchError((error) => {
        if (error.status === 429) {
          this.toastr.error(Messages.Errors.wrongValidationCode, Messages.Errors.error);
        } else if (error.status === 400) {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }

        return throwError(() => error);
      })
    );
  }

  sendVerificationCodeByEmail(data: ISendLoginCodeRequest): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/auth/verification-code-email`, data).pipe(
      catchError((error) => {
        if (error.status === 404) {
          this.toastr.error(Messages.Errors.userNotFound, Messages.Errors.error);
        } else if (error.status === 409) {
          this.toastr.error(Messages.Errors.duplicateEmail, Messages.Errors.error);
        } else if (error.status === 431) {
          this.toastr.error(Messages.Errors.accessLimited, Messages.Errors.error);
        } else if (error.status === 400) {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }

        return throwError(() => error);
      })
    );
  }

  validateVerificationCodeByEmail(data: ISendLoginCodeRequest): Observable<IJwtResponse> {
    return this.http.post<IJwtResponse>(`${this.baseUrl}/auth/validate-email-verification-code`, data).pipe(
      tap((res) => {
        if (res && res.token) {
          this.jwtHelperService.setToken(res.token);
        }
      }),
      catchError((error) => {
        if (error.status === 429) {
          this.toastr.error(Messages.Errors.wrongValidationCode, Messages.Errors.error);
        } else if (error.status === 404) {
          this.toastr.error(Messages.Errors.duplicateUserMissingEmail, Messages.Errors.error);
        } else if (error.status === 404) {
          this.toastr.error(Messages.Errors.userNotFound, Messages.Errors.error);
        } else if (error.status === 409) {
          this.toastr.error(Messages.Errors.duplicateEmail, Messages.Errors.error);
        } else if (error.status === 431) {
          this.toastr.error(Messages.Errors.accessLimited, Messages.Errors.error);
        } else if (error.status === 400) {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }

        return throwError(() => error);
      })
    );
  }

  refreshToken(): Observable<IJwtResponse> {
    return this.http.post<IJwtResponse>(`${this.baseUrl}/auth/refresh-token`, null).pipe(
      tap((res) => {
        if (res && res.token) {
          this.jwtHelperService.setToken(res.token);
        }
      }),
      catchError((error) => {
        if (error.status === 429) {
          this.toastr.error(Messages.Errors.wrongValidationCode, Messages.Errors.error);
        } else if (error.status === 400) {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }

        return throwError(() => error);
      })
    );
  }
}
