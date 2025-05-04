import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { IUserTransaction } from '../../models/IUserTransaction';
import { catchError, Observable, throwError } from 'rxjs';
import { Messages } from '../../texts/messages';

@Injectable({
  providedIn: 'root'
})
export class PaymentHttpService {

  private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastService
  ) { }

  getUserTransactions(): Observable<IUserTransaction[]> {
    return this.http.get<IUserTransaction[]>(`${this.baseUrl}/payment/user-transaction-list`).pipe(
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
