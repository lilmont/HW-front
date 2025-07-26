import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { GuestGuard } from './guest.guard';
import { Messages } from '../texts/messages';
import { LoginUserComponent } from './components/login-user/login-user.component';

const routes: Routes = [
    { path: 'signup', component: SignupComponent, canActivate: [GuestGuard], data: { title: Messages.Titles.hardworker + ' - ' + Messages.Titles.LoginOrSignup } },
    { path: 'mazmon-signup', component: LoginUserComponent, canActivate: [GuestGuard], data: { title: Messages.Titles.hardworker + ' - ' + Messages.Titles.loginAsUser } },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }