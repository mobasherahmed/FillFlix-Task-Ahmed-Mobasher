import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './featuers-routing.module';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';
import { CudMethodsComponent } from './components/cud-methods/cud-methods.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/modules/material/material.module';
import { PhoneLoginComponent } from './components/phone-login/phone-login.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UsersComponent, UserComponent, CudMethodsComponent, PhoneLoginComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SharedModule,
    FormsModule,
    MaterialModule
  ]
})
export class FeaturesModule { }
