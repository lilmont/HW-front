import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '../../core/services/jwt.helper.service';


export const guestGuard: CanActivateFn = (route, state) => {
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);
  if (jwtHelper.isLoggedIn()) {
    router.navigate(['/mazmon']);
    return false;
  }

  return true;
};
