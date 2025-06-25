import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { Messages } from '../texts/messages';

const routes: Routes = [
    { path: '', component: ProjectsListComponent, data: { title: Messages.Titles.hardworker + ' - ' + Messages.Titles.projects } }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule { }