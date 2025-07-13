import { Injectable } from '@angular/core';
import { ISupportVideoQueryParameters } from '../models/ISupportVideoQueryParameters';
import { ISupportVideoListItem } from '../models/ISupportVideoListItem';
import { IPagedResult } from '../models/IPagedResult';
import { IApiResponse } from '../models/IApiResponse';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastService } from '../../core/services/toast.service';
import { Messages } from '../../texts/messages';
import { ISupportVideoDetail } from '../models/ISupportVideoDetail';
import { IDeleteConfirmationCode } from '../models/IDeleteConfirmationCode';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastService) { }

  getPagedSupportVideos(data: ISupportVideoQueryParameters): Observable<IApiResponse<IPagedResult<ISupportVideoListItem>>> {
    const params = this.buildHttpParams(data);

    return this.http.get<IApiResponse<IPagedResult<ISupportVideoListItem>>>(`${this.baseUrl}/api/mazmon/common/support-video-list`, { params }).pipe(
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

  getSupportVideoDetail(id: number): Observable<IApiResponse<ISupportVideoDetail>> {
    return this.http.get<IApiResponse<ISupportVideoDetail>>(`${this.baseUrl}/api/mazmon/common/support-video-detail`, { params: { id: id.toString() } }).pipe(
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

  addVideo(course: FormData): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(`${this.baseUrl}/api/mazmon/common/add-support-video`, course).pipe(
      catchError((error) => {
        if (error.status === 440) {
          this.toastr.error(Messages.Errors.fileSizeTooLarge, Messages.Errors.error);
        } else if (error.status === 441) {
          this.toastr.error(Messages.Errors.invalidImage, Messages.Errors.error);
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

  editVideo(course: FormData): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(`${this.baseUrl}/api/mazmon/common/edit-support-video`, course).pipe(
      catchError((error) => {
        if (error.status === 440) {
          this.toastr.error(Messages.Errors.fileSizeTooLarge, Messages.Errors.error);
        } else if (error.status === 441) {
          this.toastr.error(Messages.Errors.invalidImage, Messages.Errors.error);
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

  deleteVideo(video: IDeleteConfirmationCode): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(`${this.baseUrl}/api/mazmon/common/delete-support-video`, video).pipe(
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

  private buildHttpParams(data: ISupportVideoQueryParameters): HttpParams {
    let params = new HttpParams();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });
    return params;
  }
}
