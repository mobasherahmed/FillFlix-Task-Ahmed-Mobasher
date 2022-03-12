import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from './componenets/forget-password/forget-password.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { CodeActivationComponent } from './componenets/code-activation/code-activation.component';



@NgModule({
  declarations: [ForgetPasswordComponent, CodeActivationComponent],
  imports: [
    ReactiveFormsModule,
    TranslateModule.forChild(),
    CommonModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
