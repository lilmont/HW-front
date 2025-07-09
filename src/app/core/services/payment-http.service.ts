import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { IUserTransaction } from '../../models/IUserTransaction';
import { catchError, Observable, throwError } from 'rxjs';
import { Messages } from '../../texts/messages';
import { ISuggestedWalletAmount } from '../../models/ISuggestedWalletAmount';
import { JwtHelperService } from './jwt.helper.service';
import { IUserBalance } from '../../models/IUserBalance';
import { IWithdrawalRequest } from '../../models/IWithdrawalRequest';

@Injectable({
  providedIn: 'root'
})
export class PaymentHttpService {

  private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastService,
    private jwtHelperService: JwtHelperService
  ) { }

  getUserTransactions(): Observable<IUserTransaction[]> {
    return this.http.get<IUserTransaction[]>(`${this.baseUrl}/payment/user-transaction-list`).pipe(
      catchError((error) => {
        if (error.status === 431) {
          this.jwtHelperService.logout();
          location.href = '/';
        } else if (error.status === 400) {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }
        return throwError(() => error);
      })
    );
  }

  getUserBalance(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/payment/user-balance`).pipe(
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

  getUserWithdrawalInfo(): Observable<IUserBalance> {
    return this.http.get<IUserBalance>(`${this.baseUrl}/payment/user-withdrawal-info`).pipe(
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

  ValidateTransaction(transactionNumber: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/payment/validate-transaction`, { transactionNumber: transactionNumber }).pipe(
      catchError((error) => {
        if (error.status === 431) {
          this.jwtHelperService.logout();
          location.href = '/';
        } else if (error.status === 404) {
          this.toastr.error(Messages.Errors.transactionNotFound, Messages.Errors.error);
        } else if (error.status === 409) {
          this.toastr.error(Messages.Errors.duplicateTransaction, Messages.Errors.error);
        }
        else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }
        return throwError(() => error);
      })
    );
  }

  getSuggestedWalletAmounts(): Observable<ISuggestedWalletAmount[]> {
    return this.http.get<ISuggestedWalletAmount[]>(`${this.baseUrl}/payment/suggested-wallet-amounts`).pipe(
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

  addWithdrawalRequest(request: IWithdrawalRequest) {
    return this.http.post<any>(`${this.baseUrl}/payment/add-withdrawal-request`, request).pipe(
      catchError((error) => {
        if (error.status === 431) {
          this.jwtHelperService.logout();
          location.href = '/';
        } else if (error.status === 450) {
          this.toastr.error(Messages.Errors.withdrawAmountExceed, Messages.Errors.error);
        } else if (error.status === 400) {
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
