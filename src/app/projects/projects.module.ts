import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsListComponent } from './componenets/projects-list/projects-list.component';
import { ProjectFormComponent } from './componenets/project-form/project-form.component';
import { ProjectsRoutingModule } from './projects-routing.module';



@NgModule({
  declarations: [ProjectsListComponent, ProjectFormComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
