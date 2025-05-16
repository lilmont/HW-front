import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { catchError, Observable, throwError } from 'rxjs';
import { IHostingPlan } from '../../models/IHostingPlan';
import { Messages } from '../../texts/messages';

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
}
