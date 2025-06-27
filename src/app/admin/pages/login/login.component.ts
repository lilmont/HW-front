import { Component } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { environment } from '../../../../environments/environment';
import { ILogin, Login } from '../../models/ILogin';
import { AuthHttpService } from '../../services/auth-http.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastrService } from 'ngx-toastr';
import { UserInfoService } from '../../../core/services/user-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'hw-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  login: ILogin = new Login();

  constructor(private authHttpService: AuthHttpService,
    private loadingService: LoadingService,
    private toastr: ToastrService,
    private userInfoService: UserInfoService,
    private router: Router,
  ) { }

  loginUser() {
    this.loadingService.show();

    this.authHttpService.login(this.login).subscribe({
      next: () => {
        this.toastr.success(Messages.Success.loginSuccessful, '');
        this.loadingService.hide();
        this.userInfoService.loadUser();
        this.router.navigateByUrl("/mazmon/users");
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }
}
