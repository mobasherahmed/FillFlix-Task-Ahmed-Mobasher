import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard';
import { TasksFormComponent } from './componenets/tasks-form/tasks-form.component';
import { TasksListComponent } from './componenets/tasks-list/tasks-list.component';
import { UploadedTasksListComponent } from './componenets/uploaded-tasks-list/uploaded-tasks-list.component';

const routes: Routes = [
    {
        path: 'TasksList',
        component: TasksListComponent,
        canActivate:[AuthGuard]

    },
    {
        path: 'TaskForm',
        component: TasksFormComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'UploadedTasksList',
        component: UploadedTasksListComponent,
        canActivate:[AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule {}
