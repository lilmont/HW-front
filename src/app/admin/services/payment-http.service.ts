import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastService } from '../../core/services/toast.service';
import { IWithdrawalRequestListItem } from '../models/IWithdrawalRequestListItem';
import { IPagedResult } from '../models/IPagedResult';
import { IApiResponse } from '../models/IApiResponse';
import { catchError, Observable, throwError } from 'rxjs';
import { IWithdrawalQueryParameters } from '../models/IWithdrawalQueryParameters';
import { Messages } from '../../texts/messages';
import { IRejectWithdrawalRequest } from '../models/IRejectWithdrawalRequest';

@Injectable({
  providedIn: 'root'
})
export class PaymentHttpService {

  private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastService) { }

  getPagedWithdrawalRequests(data: IWithdrawalQueryParameters): Observable<IApiResponse<IPagedResult<IWithdrawalRequestListItem>>> {
    const params = this.buildHttpParams(data);

    return this.http.get<IApiResponse<IPagedResult<IWithdrawalRequestListItem>>>(`${this.baseUrl}/api/mazmon/payment/withdrawal-request-list`, { params }).pipe(
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

  rejectWithdrawalRequest(request: IRejectWithdrawalRequest): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(`${this.baseUrl}/api/mazmon/payment/reject-withdrawal-request`, request).pipe(
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

  private buildHttpParams(data: IWithdrawalQueryParameters): HttpParams {
    let params = new HttpParams();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });
    return params;
  }
}
