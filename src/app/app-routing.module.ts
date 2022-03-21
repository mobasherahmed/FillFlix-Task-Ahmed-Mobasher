import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TwoFactorAuthenticationGuard } from './shared/guard/2FA.guard';
import { AuthGuard } from './shared/guard/auth.guard';
import { Authorization } from './shared/guard/authorization';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
    },
    {
        path: 'authentication',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
    },
    {
        path:'**',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)

    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard,TwoFactorAuthenticationGuard,Authorization]
})
export class AppRoutingModule {}
