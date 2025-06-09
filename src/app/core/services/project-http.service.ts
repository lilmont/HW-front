import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { JwtHelperService } from './jwt.helper.service';
import { IProject } from '../../models/IProject';
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

  getAllUserProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(`${this.baseUrl}/projects/projects-list`).pipe(
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
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }

  editProject(project: FormData): Observable<IProject> {
    return this.http.put<IProject>(`${this.baseUrl}/projects/edit-project`, project).pipe(
      catchError((error) => {
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }

  private handleError(error: any): void {
    if (error.status === 400) {
      this.toastr.error(Messages.Errors.invalidInput, Messages.Errors.error);
    } else if (error.status === 401) {
      this.toastr.error(Messages.Errors.unauthorized, Messages.Errors.error);
    } else {
      this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
    }
  }
}
