import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { FeatureService } from 'src/app/features/services/feature.service';
import { ManagementSystemService } from 'src/app/management-system/services/management-system.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.scss']
})
export class TasksFormComponent implements OnInit {
  taskForm:FormGroup;
  categories: any;
  projects: any;
  taskId: number;
  selectedNode;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  constructor(private fb:FormBuilder,private translate:TranslateService,private validation:ValidationService,
    private _task:TasksService,private location:Location,private share:SharedDataService) { 
   
    this.taskForm = fb.group({
      tasks:fb.array([])
    })
  }


  ngOnInit(): void {
    this.getProjects();
    this.setValues()
  }


    setValues(){
      this._task.tasks.subscribe(task=>{
        console.log("caa",task);
        
          if(task.id){
                  let elFormGroup = this.fb.group({
                    taskTitle:  [task.taskTitle,Validators.required],
                    startDate:  [task.startDate,Validators.required],
                    endDate:  [task.endDate],
                    assignedTo:  [task.assignedTo],
                    description:  [task.description],
                    project:  [task.description],
                    id:  [task.id],
                    isDeleted:[false],
                  })
                  this.tasks().push(elFormGroup);
                  this.taskForm.updateValueAndValidity();
          }else{
          this.addTask();
          }
      })
       }

    tasks(): FormArray {
        return this.taskForm.get('tasks') as FormArray;
      }
     
      addTask() {
          this.tasks().push(this.newTask());
        }
    
        newTask(): FormGroup {
          return this.fb.group({
          taskTitle:  ['',Validators.required],
          startDate:  ['',Validators.required],
          endDate:  [''],
          assignedTo:  [''],
          description:  [''],
          project:  [''],
          id:[null],
          isDeleted:[false],
          });
        }

        deleteTask(index){
            if(!this.checkTaskDelete()){
              let arr = this.taskForm.get('tasks') as FormArray;
              arr.removeAt(index);
              }
         }

        checkTaskDelete(){
          let arr = this.taskForm.get('tasks') as FormArray;
        if(arr.length == 1) return true;
        return false;
        }

        getStartDate(){
          return this.taskForm.controls.startDate.value;
        }

        getToday(){
          let today = new Date();
          return today;
        }

        getEndDate(index){
          return this.taskForm.controls.endDate.value;
        }
        getProjects(){
          this._task.getProjects().subscribe(res=>{
            this.projects = res; 
          })
        }

        submitForm(){
         
        }

      checkDisable(){
          if(this.taskForm.invalid) return true
          return false;
        }

        cancel(){
          this.location.back();
        }

        ngOnDestroy(){
          this._task.tasks.next({})
        }

}
