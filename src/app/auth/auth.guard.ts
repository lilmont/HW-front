import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from "../core/services/jwt.helper.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private jwtHelper: JwtHelperService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.jwtHelper.isLoggedIn()) return true;

        this.router.navigate(['/users/signup'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}