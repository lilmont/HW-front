import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { IUserInfo } from '../../models/IUserInfo';
import { JwtHelperService } from './jwt.helper.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private userSubject = new BehaviorSubject<IUserInfo | null>(null);
  user$: Observable<IUserInfo | null> = this.userSubject.asObservable();

  constructor(private userService: UserService
    , private jwtHelperService: JwtHelperService
  ) { }

  loadUser() {
    if (this.jwtHelperService.isLoggedIn())
      this.userService.getUserInfo().subscribe(user => this.userSubject.next(user));
  }

  updateUser(user: IUserInfo) {
    this.userSubject.next(user);
  }

  getUserSnapshot(): IUserInfo | null {
    return this.userSubject.getValue();
  }
}
