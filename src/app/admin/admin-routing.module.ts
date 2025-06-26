import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardLayoutComponent } from "./components/dashboard-layout/dashboard-layout.component";
import { WebCourseComponent } from "../dashboard/pages/web-course/web-course.component";

// const routes: Routes = [
//   { path: 'login', component: AdminLoginComponent }, // no guard here
//   { 
//     path: '', 
//     canActivate: [AuthGuard, AdminGuard], // protect all other admin routes
//     children: [
//       { path: 'dashboard', component: AdminDashboardComponent },
//       { path: 'users', component: AdminUsersComponent },
//       { path: 'courses', component: AdminCoursesComponent },
//       // other admin routes
//     ]
//   }
// ];

const routes: Routes = [
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }