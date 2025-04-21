import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ILoginRequest } from '../../models/ILoginRequest';
import { IJwtResponse } from '../../models/IJwtResponse';
import { ISendSignupCodeRequest } from '../../models/SendSignupCodeRequest';
import { Messages } from '../../texts/messages';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private toastr: ToastService) { }

  sendSignupRequest(data: ISendSignupCodeRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/signup-code`, data).pipe(
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

  validateSignupCode(data: ISendSignupCodeRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/verify-signup-code`, data).pipe(
      catchError((error) => {
        if (error.status === 429) {
          this.toastr.error(Messages.Errors.wrongValidationCode, Messages.Errors.error);
        } else if (error.status === 400) {
          this.toastr.error(Messages.Errors.wrongValidationCode, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }

        return throwError(() => error);
      })
    );
  }

  // signup(data: ISignupRequest): Observable<IJwtResponse> {
  //   return this.http.post<IJwtResponse>(`${this.baseUrl}/auth/signup`, data);
  // }

  // login(data: ILoginRequest): Observable<IJwtResponse> {
  //   return this.http.post<IJwtResponse>(`${this.baseUrl}/auth/login`, data);
  // }
}
