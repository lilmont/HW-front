import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        // Clone request with Authorization header if token exists
        const clonedReq = token
            ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
            : req;

        return next.handle(clonedReq).pipe(
            tap((event) => {
                // If response has a new token in headers, update it in localStorage
                if (event instanceof HttpResponse) {
                    const newToken = event.headers.get('X-New-JWT');
                    if (newToken) {
                        localStorage.setItem('token', newToken);
                    }
                }
            }),
            catchError((error: HttpErrorResponse) => {
                console.error("Error occurred:", error.headers.get('X-User-Status'));
                if (error.status === 401 && error.headers.get('X-User-Status') === 'deactivated') {
                    localStorage.removeItem('token');
                    location.href = '/';
                }
                return throwError(() => error);
            })
        );
    }
}