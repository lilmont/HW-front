import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { JwtHelperService } from '../../../core/services/jwt.helper.service';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../core/services/user.service';

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
  constructor(public jwtHelperService: JwtHelperService,
    private userService: UserService
  ) {
  }
  ngOnInit(): void {
    this.userService.getUserInfo().subscribe({
      next: (data) => {
        this.avatarImage = data.avatarImage;
      },
      error: (error) => {

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
