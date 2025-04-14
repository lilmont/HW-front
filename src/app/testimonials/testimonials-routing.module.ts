import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestimonialsGridComponent } from './components/testimonials-grid/testimonials-grid.component';

const routes: Routes = [
    { path: '', component: TestimonialsGridComponent }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestimonialsRoutingModule { }