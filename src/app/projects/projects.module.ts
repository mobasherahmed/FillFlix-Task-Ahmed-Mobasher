import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectsListComponent } from './componenets/projects-list/projects-list.component';
import { ProjectFormComponent } from './componenets/project-form/project-form.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/modules/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ProjectsListMatTableComponent } from './componenets/projects-list-mat-table/projects-list-mat-table.component';



@NgModule({
  declarations: [ProjectsListComponent, ProjectFormComponent, ProjectsListMatTableComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    MaterialModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    BsDropdownModule,
  ],
  providers:[DatePipe],

})
export class ProjectsModule { }
