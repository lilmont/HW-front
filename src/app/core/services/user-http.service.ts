import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IUserAvatarUpdateResponse, IUserInfo } from '../../models/IUserInfo';
import { environment } from '../../../environments/environment';
import { Messages } from '../../texts/messages';
import { IJwtResponse } from '../../models/IJwtResponse';
import { JwtHelperService } from './jwt.helper.service';

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
}
