import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { HomePageComponent } from './home/components/home-page/home-page.component';
import { TestimonialsGridComponent } from './testimonials/components/testimonials-grid/testimonials-grid.component';
import { ProjectsListComponent } from './projects/components/projects-list/projects-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomePageComponent },  // Home page
      { path: 'testimonials', component: TestimonialsGridComponent }, // Testimonials page
      { path: 'projects', component: ProjectsListComponent }, // Projects page
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollOffset: [0, 100],
      scrollPositionRestoration: 'enabled'
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
