import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { Messages } from '../texts/messages';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AcademyComponent } from './components/academy/academy.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'contact-us', component: ContactUsComponent, data: { title: Messages.Titles.hardworker + ' - ' + Messages.Titles.contactUs } },
    { path: 'academy', component: AcademyComponent, data: { title: Messages.Titles.hardworker + ' - ' + Messages.Titles.academy } }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
