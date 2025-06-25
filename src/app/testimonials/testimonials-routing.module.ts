import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestimonialsGridComponent } from './components/testimonials-grid/testimonials-grid.component';
import { Messages } from '../texts/messages';

const routes: Routes = [
    { path: '', component: TestimonialsGridComponent, data: { title: Messages.Titles.hardworker + ' - ' + Messages.Titles.testimonials } }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestimonialsRoutingModule { }