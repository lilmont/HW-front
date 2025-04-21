import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { JwtHelperService } from "../core/services/jwt.helper.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private jwtHelper: JwtHelperService, private router: Router) { }

    canActivate(): boolean {
        if (this.jwtHelper.isLoggedIn()) return true;

        this.router.navigate(['/login']);
        return false;
    }
}