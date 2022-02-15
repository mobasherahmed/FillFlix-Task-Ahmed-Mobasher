import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './featuers-routing.module';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';
import { CudMethodsComponent } from './components/cud-methods/cud-methods.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/modules/material/material.module';



@NgModule({
  declarations: [UsersComponent, UserComponent, CudMethodsComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class FeaturesModule { }
