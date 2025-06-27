import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '../core/services/jwt.helper.service';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
    constructor(private jwtHelper: JwtHelperService, private router: Router) { }

    canActivate(): boolean {
        if (!this.jwtHelper.isLoggedIn()) {
            this.router.navigate(['/mazmon/login']);
            return false;
        }

        const user = this.jwtHelper.getUser();

        if (!user) {
            this.router.navigate(['/mazmon/login']);
            return false;
        }

        const roles = user.role;

        const hasAdminRole = roles === 'Admin';

        if (hasAdminRole) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}
