import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IJwtResponse } from '../../models/IJwtResponse';
import { ISendSignupCodeRequest } from '../../models/SendSignupCodeRequest';
import { Messages } from '../../texts/messages';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  private baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private toastr: ToastService) { }

  sendVerificationCode(data: ISendSignupCodeRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/verification-code`, data).pipe(
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
  validateVerificationCode(data: ISendSignupCodeRequest): Observable<IJwtResponse> {
    return this.http.post<IJwtResponse>(`${this.baseUrl}/auth/validate-verification-code`, data).pipe(
      tap((res) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
        }
      }),
      catchError((error) => {
        console.log("error", error)
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
