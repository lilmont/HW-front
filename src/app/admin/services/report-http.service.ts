import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastService } from '../../core/services/toast.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Messages } from '../../texts/messages';
import { IMonthlyReportRequest } from '../models/IMonthlyReportRequest';
import { IMonthlyReportResponse } from '../models/IMonthlyReportResponse';
import { IUserProgressResponse } from '../models/IUserProgressResponse';
import { IUserProgressRequest } from '../models/IUserProgressRequest';
import { IDailyIncomeDetailRequest } from '../models/IDailyIncomeDetailRequest';
import { IDailyIncomeDetailResponse } from '../models/IDailyIncomeDetailResponse';
import { IUserOverallProgressResponse } from '../models/IUserOverallProgressResponse';
import { IUserMonthlyOverallProgressResponse } from '../models/IUserMonthlyOverallProgressResponse';

@Injectable({
  providedIn: 'root'
})
export class ReportHttpService {

  private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastService) { }

  getIncomeByMonthAndYear(data: IMonthlyReportRequest): Observable<IMonthlyReportResponse> {
    const params = this.buildHttpParams(data);

    return this.http.get<IMonthlyReportResponse>(`${this.baseUrl}/api/mazmon/reports/monthly-income`, { params }).pipe(
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

  getDailyIncomeDetailsByTransactionIds(data: IDailyIncomeDetailRequest): Observable<IDailyIncomeDetailResponse[]> {
    return this.http.post<IDailyIncomeDetailResponse[]>(`${this.baseUrl}/api/mazmon/reports/daily-income-detail`, data).pipe(
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

  getUserCreatedByMonthAndYear(data: IMonthlyReportRequest): Observable<IMonthlyReportResponse> {
    const params = this.buildHttpParams(data);

    return this.http.get<IMonthlyReportResponse>(`${this.baseUrl}/api/mazmon/reports/monthly-user`, { params }).pipe(
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

  getUsersProgressByIds(data: IUserProgressRequest): Observable<IUserProgressResponse[]> {
    return this.http.post<IUserProgressResponse[]>(`${this.baseUrl}/api/mazmon/reports/daily-users-detail`, data).pipe(
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

  getUsersOverallProgressByIds(data: IUserProgressRequest): Observable<IUserOverallProgressResponse[]> {
    return this.http.post<IUserOverallProgressResponse[]>(`${this.baseUrl}/api/mazmon/reports/daily-users-overall`, data).pipe(
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

  getUsersMonthlyOverallProgressByIds(data: IMonthlyReportRequest): Observable<IUserMonthlyOverallProgressResponse> {
    const params = this.buildHttpParams(data);

    return this.http.get<IUserMonthlyOverallProgressResponse>(`${this.baseUrl}/api/mazmon/reports/daily-users-overall`, { params }).pipe(
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

  private buildHttpParams(data: IMonthlyReportRequest): HttpParams {
    let params = new HttpParams();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });
    return params;
  }
}
