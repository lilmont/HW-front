import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        //component: DashboardLayoutComponent,
        children: [
            //{ path: 'web-course', component: WebCourseComponent, canActivate: [AuthGuard], data: { title: Messages.Titles.dashboard + ' - ' + Messages.Titles.webCourse } },
            // { path: 'discount-codes', component: DiscountCodesComponent, canActivate: [AuthGuard] },
        ],
    },
];

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

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }