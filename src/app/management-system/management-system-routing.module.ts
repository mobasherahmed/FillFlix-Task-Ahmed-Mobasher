import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard';
import { AccessRulesFormComponent } from './components/access-rules-form/access-rules-form.component';
import { AccessRulesComponent } from './components/access-rules/access-rules.component';

const routes: Routes = [
    {
        path: 'AccessRuleForm',
        component: AccessRulesFormComponent,
        canActivate: [AuthGuard],
   

    },
    {
        path: 'AccessRules',
        component: AccessRulesComponent,
        canActivate: [AuthGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManagementSystemRoutingModule {}
