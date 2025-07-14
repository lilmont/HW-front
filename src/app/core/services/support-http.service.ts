import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { JwtHelperService } from './jwt.helper.service';
import { ISupportVideo } from '../../models/ISupportVideo';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Messages } from '../../texts/messages';
import { ISupportAnnouncement } from '../../models/ISupportAnnouncement';

@Injectable({
  providedIn: 'root'
})
export class SupportHttpService {
  private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastService,
    private jwtHelperService: JwtHelperService
  ) { }

  getAllSupportVideos(): Observable<ISupportVideo[]> {
    return this.http.get<ISupportVideo[]>(`${this.baseUrl}/support/support-videos-list`).pipe(
      catchError((error) => {
        if (error.status === 431) {
          this.jwtHelperService.logout();
          location.href = '/';
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

  getAllSampleVideos(): Observable<ISupportVideo[]> {
    return this.http.get<ISupportVideo[]>(`${this.baseUrl}/support/sample-support-videos-list`).pipe(
      catchError((error) => {
        if (error.status === 431) {
          this.jwtHelperService.logout();
          location.href = '/';
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

  getSupportAnnouncements(): Observable<ISupportAnnouncement[]> {
    return this.http.get<ISupportAnnouncement[]>(`${this.baseUrl}/support/support-announcement-list`).pipe(
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
