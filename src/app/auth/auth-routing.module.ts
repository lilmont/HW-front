import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { GuestGuard } from './guest.guard';

const routes: Routes = [
    { path: 'signup', component: SignupComponent, canActivate: [GuestGuard] },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }