import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CudMethodsComponent } from './components/cud-methods/cud-methods.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
    {
        path:'users',
        component:UsersComponent
    },
    {
        path:'user',
        component:UserComponent
    },
    {
        path:'cud',
        component:CudMethodsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeaturesRoutingModule {}
