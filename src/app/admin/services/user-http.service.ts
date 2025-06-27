import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastService } from '../../core/services/toast.service';
import { IUserQueryParameters } from '../models/IUserQueryParameters';
import { IUserListItem } from '../models/IUserListItem';
import { IPagedResult } from '../models/IPagedResult';
import { catchError, Observable, throwError } from 'rxjs';
import { Messages } from '../../texts/messages';
import { IApiResponse } from '../models/IApiResponse';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastService) { }

  getPagesUsers(data: IUserQueryParameters): Observable<IApiResponse<IPagedResult<IUserListItem>>> {
    const params = this.buildHttpParams(data);

    return this.http.get<IApiResponse<IPagedResult<IUserListItem>>>(`${this.baseUrl}/api/mazmon/users/user-list`, { params }).pipe(
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

  private buildHttpParams(data: IUserQueryParameters): HttpParams {
    let params = new HttpParams();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    return params;
  }
}
