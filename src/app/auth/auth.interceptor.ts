import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { JwtHelperService } from "../core/services/jwt.helper.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private jwtHelperService: JwtHelperService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.jwtHelperService.getToken();

        // Clone request with Authorization header if token exists
        const clonedReq = token
            ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
            : req;

        return next.handle(clonedReq).pipe(
            tap((event) => {
                // If response has a new token in headers, update it
                if (event instanceof HttpResponse) {
                    const newToken = event.headers.get('X-New-JWT');
                    if (newToken) {
                        this.jwtHelperService.setToken(newToken);
                    }
                }
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 && error.headers.get('X-User-Status') === 'deactivated') {
                    this.jwtHelperService.logout();
                    location.href = '/';
                }
                return throwError(() => error);
            })
        );
    }
}