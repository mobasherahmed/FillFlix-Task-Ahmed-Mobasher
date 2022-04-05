import { Location } from '@angular/common';
import { HttpBackend, HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
  Files:any=[];
  token: string ='';
  constructor(private fb:FormBuilder,private router:Router,public handler: HttpBackend,
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

        checkUploadFilesDisabled(index){
          let taskTitle = this.tasks().at(index).value.taskTitle;
          let startDate = this.tasks().at(index).value.startDate;
          if(taskTitle && startDate){
            return false;
          }else{
            return true;
          }
        }
        getFiles(event,index){
          let Files = event.target.files;
          let taskTitle = this.tasks().at(index).value.taskTitle;
          let startDate = this.tasks().at(index).value.startDate;
          if(Files.length > 0){
            let object = {taskTitle,startDate,Files}
            this.Files.push(object);
          }
        }
      
        uploadTasksFiles() {
          const Data = new FormData();
          Data.append('Files', this.Files)
          let headers = new HttpHeaders();
          headers.append('Content-Type', 'multipart/form-data');
          var http = new HttpClient(this.handler);
          const req = new HttpRequest('PUT', `https://admin.xwar.app:2052/web/uploadTasksFiles`, Data, {
            headers: headers.set('authorization', `${this.token}`)
          });
          http.request(req).subscribe((success: any) => {
          if (success.type === 4) {
            this.router.navigate(['/tasks/TasksList'])
            }
          })
        }
      
        submitForm(){
         console.log("form",this.taskForm.value);
         console.log("Files", this.Files);
         const tasks = this.taskForm.value.tasks;
         this._task.manageTasks(tasks).subscribe(res=>{
           this.uploadTasksFiles();
         });
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
