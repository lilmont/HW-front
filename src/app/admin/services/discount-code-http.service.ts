import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastService } from '../../core/services/toast.service';
import { IDiscountCodeQueryParameters } from '../models/IDiscountCodeQueryParameters';
import { IDiscountCodeListItem } from '../models/IDiscountCodeListItem';
import { IPagedResult } from '../models/IPagedResult';
import { IApiResponse } from '../models/IApiResponse';
import { catchError, Observable, throwError } from 'rxjs';
import { Messages } from '../../texts/messages';
import { IProductDropdown } from '../models/IProductDropdown';
import { IDiscountCodeDetail } from '../models/IDiscountCodeDetail';

@Injectable({
  providedIn: 'root'
})
export class DiscountCodeHttpService {

  private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastService) { }

  getPagedDiscountCodes(data: IDiscountCodeQueryParameters): Observable<IApiResponse<IPagedResult<IDiscountCodeListItem>>> {
    const params = this.buildHttpParams(data);

    return this.http.get<IApiResponse<IPagedResult<IDiscountCodeListItem>>>(`${this.baseUrl}/api/mazmon/discount-code/discount-code-list`, { params }).pipe(
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

  getProductsDropwdown(): Observable<IApiResponse<IProductDropdown[]>> {
    return this.http.get<IApiResponse<IProductDropdown[]>>(`${this.baseUrl}/api/mazmon/courses/product-list`).pipe(
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

  addDiscountCode(discountCode: IDiscountCodeDetail): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(`${this.baseUrl}/api/mazmon/discount-code/add-discount-code`, discountCode).pipe(
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

  private buildHttpParams(data: IDiscountCodeQueryParameters): HttpParams {
    let params = new HttpParams();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });
    return params;
  }
}
