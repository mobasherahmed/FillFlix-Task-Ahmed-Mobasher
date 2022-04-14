import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyListComponent } from './componenets/survey-list/survey-list.component';
import { SurveyFormComponent } from './componenets/survey-form/survey-form.component';
import { SurveyRoutingModule } from './survey-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/modules/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SurveyListComponent, SurveyFormComponent],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    SharedModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
  ]
})
export class SurveyModule { }
