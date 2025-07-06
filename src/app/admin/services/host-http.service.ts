import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastService } from '../../core/services/toast.service';
import { IHostQueryParameters } from '../models/IHostQueryParameters';
import { catchError, Observable, throwError } from 'rxjs';
import { IApiResponse } from '../models/IApiResponse';
import { IPagedResult } from '../models/IPagedResult';
import { IHostListItem } from '../models/IHostListItem';
import { Messages } from '../../texts/messages';
import { IHostingDetail } from '../models/IHostingDetail';

@Injectable({
  providedIn: 'root'
})
export class HostHttpService {

  private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastService) { }

  getPagedHostingPlans(data: IHostQueryParameters): Observable<IApiResponse<IPagedResult<IHostListItem>>> {
    const params = this.buildHttpParams(data);

    return this.http.get<IApiResponse<IPagedResult<IHostListItem>>>(`${this.baseUrl}/api/mazmon/hosting/host-list`, { params }).pipe(
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

  private buildHttpParams(data: IHostQueryParameters): HttpParams {
    let params = new HttpParams();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });
    return params;
  }

  getHostingPlanDetail(id: number): Observable<IApiResponse<IHostingDetail>> {
    return this.http.get<IApiResponse<IHostingDetail>>(`${this.baseUrl}/api/mazmon/hosting/host-detail`, { params: { id: id.toString() } }).pipe(
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

  addHostingPlan(hostingPlan: IHostingDetail): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(`${this.baseUrl}/api/mazmon/hosting/add-host`, hostingPlan).pipe(
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

  editHostingPlan(hostingPlan: IHostingDetail): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(`${this.baseUrl}/api/mazmon/hosting/edit-host`, hostingPlan).pipe(
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
