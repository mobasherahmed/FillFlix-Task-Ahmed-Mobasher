import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard';
import { CustomersListComponent } from './components/customers-list/customers-list.component';

const routes: Routes = [
    {
        path: 'CustomersList',
        component: CustomersListComponent,
        canActivate:[AuthGuard]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomersRoutingModule {}
