import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { catchError, Observable, throwError } from 'rxjs';
import { IHostingPlan } from '../../models/IHostingPlan';
import { Messages } from '../../texts/messages';
import { IHostPlanInfo } from '../../models/IHostPlanInfo';
import { IUserHost } from '../../models/IUserHost';
import { ISubmitDomainInfo } from '../../models/ISubmitDomainInfo';

@Injectable({
  providedIn: 'root'
})
export class HostingHttpService {

  private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastService
  ) { }

  getUserTransactions(): Observable<IHostingPlan[]> {
    return this.http.get<IHostingPlan[]>(`${this.baseUrl}/hosting/plan-list`).pipe(
      catchError((error) => {
        if (error.status === 400) {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }
        return throwError(() => error);
      })
    );
  }

  SubmitHostingPlan(hostPlanInfo: IHostPlanInfo): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/hosting/create-hosting-plan`, hostPlanInfo).pipe(
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

  getUserHostsForUser(): Observable<IUserHost[]> {
    return this.http.get<IUserHost[]>(`${this.baseUrl}/hosting/user-host-list`).pipe(
      catchError((error) => {
        if (error.status === 400) {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }
        return throwError(() => error);
      })
    );
  }

  submitDomain(submitDomainInfo: ISubmitDomainInfo): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/hosting/submit-domain`, submitDomainInfo).pipe(
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
