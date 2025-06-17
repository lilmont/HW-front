import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { JwtHelperService } from './jwt.helper.service';
import { IProject, IProjectList } from '../../models/IProject';
import { catchError, Observable, throwError } from 'rxjs';
import { Messages } from '../../texts/messages';

@Injectable({
  providedIn: 'root'
})
export class ProjectHttpService {

  private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastService,
    private jwtHelperService: JwtHelperService
  ) { }

  getAllUserProjects(): Observable<IProjectList> {
    return this.http.get<IProjectList>(`${this.baseUrl}/projects/projects-list`).pipe(
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

  addProject(project: FormData): Observable<IProject> {
    return this.http.post<IProject>(`${this.baseUrl}/projects/add-project`, project).pipe(
      catchError((error) => {
        if (error.status === 431) {
          this.jwtHelperService.logout();
          location.href = '/';
        } else if (error.status === 440) {
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

  editProject(project: FormData): Observable<IProject> {
    return this.http.post<IProject>(`${this.baseUrl}/projects/edit-project`, project).pipe(
      catchError((error) => {
        if (error.status === 431) {
          this.jwtHelperService.logout();
          location.href = '/';
        } else if (error.status === 440) {
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
