import { Injectable } from '@angular/core';
import { IProjectQueryParameters } from '../models/IProjectQueryParameters';
import { catchError, Observable, throwError } from 'rxjs';
import { IApiResponse } from '../models/IApiResponse';
import { IPagedResult } from '../models/IPagedResult';
import { IProjectListItem } from '../models/IProjectListItem';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Messages } from '../../texts/messages';
import { ToastService } from '../../core/services/toast.service';
import { environment } from '../../../environments/environment';
import { IProjectDetail } from '../models/IProjectDetail';
import { IProjectCategory } from '../models/IProjectCategory';

@Injectable({
  providedIn: 'root'
})
export class ProjectHttpService {

  private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastService) { }

  getPagedProjects(data: IProjectQueryParameters): Observable<IApiResponse<IPagedResult<IProjectListItem>>> {
    const params = this.buildHttpParams(data);

    return this.http.get<IApiResponse<IPagedResult<IProjectListItem>>>(`${this.baseUrl}/api/mazmon/projects/project-list`, { params }).pipe(
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

  getProjectDetail(id: number): Observable<IApiResponse<IProjectDetail>> {
    return this.http.get<IApiResponse<IProjectDetail>>(`${this.baseUrl}/api/mazmon/projects/project-detail`, { params: { id: id.toString() } }).pipe(
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

  getProjectCategories(): Observable<IApiResponse<IProjectCategory[]>> {
    return this.http.get<IApiResponse<IProjectCategory[]>>(`${this.baseUrl}/api/mazmon/projects/project-category-list`).pipe(
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

  addProject(project: FormData): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(`${this.baseUrl}/api/mazmon/projects/add-project`, project).pipe(
      catchError((error) => {
        if (error.status === 409) {
          this.toastr.error(Messages.Errors.noUserWithThisUserId, Messages.Errors.error);
        }
        else if (error.status === 440) {
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

  editProject(project: FormData): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(`${this.baseUrl}/api/mazmon/projects/edit-project`, project).pipe(
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

  private buildHttpParams(data: IProjectQueryParameters): HttpParams {
    let params = new HttpParams();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });
    return params;
  }
}
