import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'features',
                loadChildren: () => import('../features/features.module').then(m => m.FeaturesModule)
            },
            {
                path: 'management',
                loadChildren: () => import('../management-system/management-system.module').then(m => m.ManagementSystemModule)
            },
            {
                path: 'tasks',
                loadChildren: () => import('../tasks/tasks.module').then(m => m.TasksModule)
            },
            {
                path: 'categories',
                loadChildren: () => import('../categories/categories.module').then(m => m.CategoriesModule)
            },
            {
                path: 'projects',
                loadChildren: () => import('../projects/projects.module').then(m => m.ProjectsModule)
            },
            {
                path: 'surveies',
                loadChildren: () => import('../survey/survey.module').then(m => m.SurveyModule)
            },
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
