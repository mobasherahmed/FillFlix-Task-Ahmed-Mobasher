import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guard';
import { CategoriesListComponent } from './componenets/categories-list/categories-list.component';
import { CategoryFormComponent } from './componenets/category-form/category-form.component';

const routes: Routes = [
    {
        path:'CategoriesList',
        component:CategoriesListComponent,
        canActivate: [AuthGuard],
    },
    {
        path:'CategoryForm',
        component:CategoryFormComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class CategoriesRoutingModule {}
