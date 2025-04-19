import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ILoginRequest } from '../../models/ILoginRequest';
import { IJwtResponse } from '../../models/IJwtResponse';
import { ISendSignupCodeRequest } from '../../models/SendSignupCodeRequest';
import { Messages } from '../../texts/messages';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiBaseUrl; // use environment config

  constructor(private http: HttpClient) { }

  sendSignupRequest(data: ISendSignupCodeRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/signup-code`, data).pipe(
      catchError((error) => {
        if (error.status === 429) {
          alert(Messages.Errors.tooManyRequests);
        } else if (error.status === 400) {
          alert(Messages.Errors.invalidRequest);
        } else {
          alert(Messages.Errors.invalidRequest);
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
