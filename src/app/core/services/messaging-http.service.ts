import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IOrderFormMessage } from '../../models/IOrderFormMessage';
import { IServiceResponse } from '../../models/IServiceResponse';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { environment } from '../../../environments/environment';
import { Messages } from '../../texts/messages';

@Injectable({
  providedIn: 'root'
})
export class MessagingHttpService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient,
    private toastr: ToastService,) { }

  addMessage(message: IOrderFormMessage): Observable<IServiceResponse<null>> {
    return this.http.post<IServiceResponse<null>>(`${this.baseUrl}/messages/add-order-message`, message).pipe(
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
