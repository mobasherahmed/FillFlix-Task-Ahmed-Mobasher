import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guard';
import { ProjectFormComponent } from './componenets/project-form/project-form.component';
import { ProjectsListComponent } from './componenets/projects-list/projects-list.component';

const routes: Routes = [
    {
        path:'ProjectsList',
        component:ProjectsListComponent,
        canActivate: [AuthGuard],

    },
    {
        path:'ProjectForm',
        component:ProjectFormComponent,
        canActivate: [AuthGuard],

    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ProjectsRoutingModule {}
