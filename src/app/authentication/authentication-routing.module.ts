import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeActivationComponent } from './componenets/code-activation/code-activation.component';
import { ForgetPasswordComponent } from './componenets/forget-password/forget-password.component';



const routes: Routes = [
    {
        path: 'activateEmail',
        component: CodeActivationComponent
    },
    {
        path: 'forgetPassword',
        component: ForgetPasswordComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
