import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './components/signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginUserComponent } from './components/login-user/login-user.component';



@NgModule({
  declarations: [
    SignupComponent,
    LoginUserComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class AuthModule { }
