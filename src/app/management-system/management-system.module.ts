import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessRulesComponent } from './components/access-rules/access-rules.component';
import { RulesPermissionsComponent } from './components/rules-permissions/rules-permissions.component';
import { RulesPermissionsFormComponent } from './components/rules-permissions-form/rules-permissions-form.component';
import { AccessRulesFormComponent } from './components/access-rules-form/access-rules-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ManagementSystemRoutingModule } from './management-system-routing.module';

@NgModule({
  declarations: [AccessRulesComponent, RulesPermissionsComponent, RulesPermissionsFormComponent, AccessRulesFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule.forChild(),
    NgMultiSelectDropDownModule.forRoot(),
    ManagementSystemRoutingModule

  ]
})
export class ManagementSystemModule { }
