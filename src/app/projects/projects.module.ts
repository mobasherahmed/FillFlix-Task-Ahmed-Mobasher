import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsListComponent } from './componenets/projects-list/projects-list.component';
import { ProjectFormComponent } from './componenets/project-form/project-form.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/modules/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProjectsListComponent, ProjectFormComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
  ]
})
export class ProjectsModule { }
