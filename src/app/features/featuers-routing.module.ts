import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard';
import { TwoFactorAuthenticationGuard } from '../shared/guard/2FA.guard';
import { CudMethodsComponent } from './components/cud-methods/cud-methods.component';
import { PhoneLoginComponent } from './components/phone-login/phone-login.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
    {
        path:'users',
        component:UsersComponent,
        canActivate: [AuthGuard,TwoFactorAuthenticationGuard]
    },
    {
        path:'user',
        component:UserComponent,
        canActivate: [AuthGuard,TwoFactorAuthenticationGuard]
    },
    {
        path:'cud',
        component:CudMethodsComponent,
        canActivate: [AuthGuard,TwoFactorAuthenticationGuard]
    },
    {
        path:'phone',
        component:PhoneLoginComponent,
        canActivate: [AuthGuard]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeaturesRoutingModule {}
