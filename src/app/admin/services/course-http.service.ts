import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastService } from '../../core/services/toast.service';
import { ICourseQueryParameters } from '../models/ICourseQueryParameters';
import { catchError, Observable, throwError } from 'rxjs';
import { IPagedResult } from '../models/IPagedResult';
import { IApiResponse } from '../models/IApiResponse';
import { ICourseListItem } from '../models/ICourseListItem';
import { Messages } from '../../texts/messages';
import { ICourseDetail } from '../models/ICourseDetail';

@Injectable({
  providedIn: 'root'
})
export class CourseHttpService {

  private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastService) { }

  getPagedCourses(data: ICourseQueryParameters): Observable<IApiResponse<IPagedResult<ICourseListItem>>> {
    const params = this.buildHttpParams(data);

    return this.http.get<IApiResponse<IPagedResult<ICourseListItem>>>(`${this.baseUrl}/api/mazmon/courses/course-list`, { params }).pipe(
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

  getCourseDetail(id: number): Observable<IApiResponse<ICourseDetail>> {
    return this.http.get<IApiResponse<ICourseDetail>>(`${this.baseUrl}/api/mazmon/courses/course-detail`, { params: { id: id.toString() } }).pipe(
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

  private buildHttpParams(data: ICourseQueryParameters): HttpParams {
    let params = new HttpParams();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });
    return params;
  }

  addCourse(course: FormData): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(`${this.baseUrl}/api/mazmon/courses/add-course`, course).pipe(
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

  editCourse(course: FormData): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(`${this.baseUrl}/api/mazmon/courses/edit-course`, course).pipe(
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
}
