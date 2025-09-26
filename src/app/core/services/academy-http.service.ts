import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ToastService } from './toast.service';
import { HttpClient } from '@angular/common/http';
import { IAcademyLog } from '../../models/IAcademyLog';
import { catchError, Observable, throwError } from 'rxjs';
import { Messages } from '../../texts/messages';

@Injectable({
  providedIn: 'root'
})
export class AcademyHttpService {

  private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastService,
  ) { }

  watchedAcademyVideo(academyLog: IAcademyLog): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/academy/add-academy-log`, academyLog).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.toastr.error(Messages.Errors.unauthorized, Messages.Errors.error);
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }
        return throwError(() => error);
      })
    );
  }
}
