import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginRequest } from '../../models/ILoginRequest';
import { IJwtResponse } from '../../models/IJwtResponse';
import { ISignupRequest } from '../../models/ISignupRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiBaseUrl; // use environment config

  constructor(private http: HttpClient) { }

  signup(data: ISignupRequest): Observable<IJwtResponse> {
    return this.http.post<IJwtResponse>(`${this.baseUrl}/auth/signup`, data);
  }

  login(data: ILoginRequest): Observable<IJwtResponse> {
    return this.http.post<IJwtResponse>(`${this.baseUrl}/auth/login`, data);
  }
}
