import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guard';
import { SurveyFormComponent } from './componenets/survey-form/survey-form.component';
import { SurveyListComponent } from './componenets/survey-list/survey-list.component';

const routes: Routes = [
    {
        path:'SurveiesList',
        component:SurveyListComponent,
        canActivate: [AuthGuard],

    },
    {
        path:'SurveiesForm',
        component:SurveyFormComponent,
        canActivate: [AuthGuard],

    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class SurveyRoutingModule {}
