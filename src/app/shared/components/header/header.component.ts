import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { JwtHelperService } from '../../../core/services/jwt.helper.service';
import { environment } from '../../../../environments/environment';
import { IUserInfo } from '../../../models/IUserInfo';
import { Subscription } from 'rxjs';
import { UserInfoService } from '../../../core/services/user-info.service';

@Component({
  selector: 'hw-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  Messages = Messages;
  showDropdown: boolean = false;
  avatarImage: string | undefined = '';
  baseUrl = environment.apiBaseUrl;
  private subscription!: Subscription;
  userInfo: IUserInfo = {
    firstName: '',
    lastName: '',
    avatarImage: ''
  }

  constructor(public jwtHelperService: JwtHelperService,
    private userInfoService: UserInfoService
  ) {
  }
  ngOnInit(): void {
    this.subscription = this.userInfoService.user$.subscribe(user => {
      if (user) {
        this.userInfo.avatarImage = user.avatarImage ?? '';
        this.userInfo.firstName = user.firstName ?? '';
        this.userInfo.lastName = user.lastName ?? '';
      }
    });
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    this.jwtHelperService.logout();
  }
}
