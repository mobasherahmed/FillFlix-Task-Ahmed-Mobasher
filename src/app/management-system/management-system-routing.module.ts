import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard';
import { AccessRulesFormComponent } from './components/access-rules-form/access-rules-form.component';

const routes: Routes = [
    {
        path: 'addAccessRule',
        component: AccessRulesFormComponent,
        canActivate: [AuthGuard]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManagementSystemRoutingModule {}
