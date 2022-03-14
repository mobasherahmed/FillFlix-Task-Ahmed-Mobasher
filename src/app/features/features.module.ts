import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './featuers-routing.module';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';
import { CudMethodsComponent } from './components/cud-methods/cud-methods.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/modules/material/material.module';
import { PhoneLoginComponent } from './components/phone-login/phone-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UsersFormComponent } from './components/users-form/users-form.component';



@NgModule({
  declarations: [UsersComponent, UserComponent, CudMethodsComponent, PhoneLoginComponent, UsersFormComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    MaterialModule,
    TranslateModule.forChild()
  ]
})
export class FeaturesModule { }
