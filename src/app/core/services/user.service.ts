import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IUserInfo } from '../../models/IUserInfo';
import { environment } from '../../../environments/environment';
import { Messages } from '../../texts/messages';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastService) { }

  updateUserInfo(data: IUserInfo): Observable<void> {
    return this.http.post<any>(`${this.baseUrl}/users/update`, data).pipe(
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
