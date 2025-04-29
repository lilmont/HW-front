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
    const decodedToken = this.jwtHelperService.getUser();
    const user: IUserInfo = {
      firstName: decodedToken?.firstName,
      lastName: decodedToken?.lastName,
      avatarImage: decodedToken?.avatarImage,
    };
    this.userSubject.next(user);
  }

  updateUser(user: IUserInfo) {
    this.userSubject.next(user);
  }

  getUserSnapshot(): IUserInfo | null {
    return this.userSubject.getValue();
  }
}
