import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { BlankLayoutComponent } from './shared/components/blank-layout/blank-layout.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, // Home
      { path: 'testimonials', loadChildren: () => import('./testimonials/testimonials.module').then(m => m.TestimonialsModule) }, // Testimonials
      { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) }, // Projects
    ]
  },
  {
    path: 'users',
    component: BlankLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, // Users/Auth
    ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), // Dashboard
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
