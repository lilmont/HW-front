import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { IJWTDecodedToken } from '../../models/IJwtDecodedToken';

@Injectable({
  providedIn: 'root'
})
export class JwtHelperService {

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): IJWTDecodedToken | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<IJWTDecodedToken>(token);
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    const user = this.getUser();
    if (!user) return false;

    return Date.now() / 1000 < user.exp;
  }

  logout() {
    localStorage.removeItem('token');
  }
}
