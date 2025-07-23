import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReferralService {

  private readonly cookieKey = 'referralCode';

  constructor() { }

  setReferralFromUrl(refCode: string): void {
    const days = 365;
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${this.cookieKey}=${refCode}; expires=${expires}; path=/`;
  }

  getReferral(): string | null {
    const name = this.cookieKey + '=';
    const cookies = decodeURIComponent(document.cookie).split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name)) {
        return cookie.substring(name.length);
      }
    }
    return null;
  }

  clearReferral(): void {
    document.cookie = `${this.cookieKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}
