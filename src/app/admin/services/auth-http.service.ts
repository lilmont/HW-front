import { Injectable } from '@angular/core';
import { IJwtResponse } from '../../models/IJwtResponse';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ILogin } from '../models/ILogin';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../core/services/toast.service';
import { JwtHelperService } from '../../core/services/jwt.helper.service';
import { environment } from '../../../environments/environment';
import { Messages } from '../../texts/messages';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastService,
    private jwtHelperService: JwtHelperService) { }

  login(data: ILogin): Observable<IJwtResponse> {
    return this.http.post<IJwtResponse>(`${this.baseUrl}/api/mazmon/auth/login`, data).pipe(
      tap((res) => {
        if (res && res.token) {
          this.jwtHelperService.setToken(res.token);
        }
      }),
      catchError((error) => {
        if (error.status === 401) {
          this.toastr.error(Messages.Errors.invalidCredentials, Messages.Errors.error);
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
