import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '../core/services/jwt.helper.service';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = (route, state) => {
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);
  if (jwtHelper.isLoggedIn()) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
