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
import { UsersListMatTableComponent } from './components/users-list-mat-table/users-list-mat-table.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



@NgModule({
  declarations: [UsersComponent, UserComponent, CudMethodsComponent, PhoneLoginComponent, UsersFormComponent, UsersListMatTableComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    MaterialModule,
    BsDropdownModule,
    TranslateModule.forChild()
  ]
})
export class FeaturesModule { }
