import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardLayoutComponent } from "./components/dashboard-layout/dashboard-layout.component";
import { AdminAuthGuard } from "./admin-auth.guard";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { UserDetailComponent } from "./pages/user-detail/user-detail.component";
import { CourseListComponent } from "./pages/course-list/course-list.component";
import { CourseDetailComponent } from "./pages/course-detail/course-detail.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent },

    {
        path: '',
        component: DashboardLayoutComponent,
        canActivate: [AdminAuthGuard],
        children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' }, // default dashboard redirect
            { path: 'users', component: UserListComponent },
            { path: 'users/:id', component: UserDetailComponent },
            { path: 'courses', component: CourseListComponent },
            { path: 'courses/course-detail', component: CourseDetailComponent },
            { path: 'courses/course-detail/:id', component: CourseDetailComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }