import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ErrorNavigationService {
  constructor(private router: Router) { }

  handleHttpError(error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.router.navigate(['/404']);
    }
  }
}

