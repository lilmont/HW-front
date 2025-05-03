import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Messages } from '../../texts/messages';
import { ICourseSession } from '../../models/ICourseSession';

@Injectable({
  providedIn: 'root'
})
export class CourseHttpService {
  private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastService
  ) { }

  getWebCourseSessions(): Observable<ICourseSession[]> {
    return this.http.get<any>(`${this.baseUrl}/courses/web-course`).pipe(
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
