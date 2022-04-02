import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListComponent } from './componenets/tasks-list/tasks-list.component';
import { TasksFormComponent } from './componenets/tasks-form/tasks-form.component';
import { TasksListMatTableComponent } from './componenets/tasks-list-mat-table/tasks-list-mat-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/modules/material/material.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TasksRoutingModule } from './tasks-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [TasksListComponent, TasksFormComponent, TasksListMatTableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    MaterialModule,
    MatDatepickerModule,
    BsDropdownModule,
    
    TranslateModule.forChild(),
    TasksRoutingModule
  ]
})
export class TasksModule { }
