import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { Messages } from '../texts/messages';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'contact-us', component: ContactUsComponent, data: { title: Messages.Titles.hardworker + ' - ' + Messages.Titles.contactUs } }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
