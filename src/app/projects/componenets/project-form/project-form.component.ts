import { Location } from '@angular/common';
import { HttpBackend, HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/categories/services/category.service';
import { TasksService } from 'src/app/tasks/services/tasks.service';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

    projectsForm:FormGroup;
    tasksIndex: any;
    projectIndex: any;
    AccountType: string;
    AccountId: string;
    categories:any
    selectedCategory:string='Select Category'
    token: any;
    Files: any=[];
    projectsArr: any[];

    constructor(
        private _project:ProjectsService,
        private _category:CategoryService,
        private fb:FormBuilder,
        private location:Location,
        private router:Router,
        public handler: HttpBackend,
        private _task:TasksService
    ) {
        this.projectsForm = fb.group({
            projects: fb.array([])
        })
    }

    ngOnInit() { 
        this.setValues();
        this.getCategories();
        this.getProjects();
    }

    getCategories(){
      this._category.getCategories().subscribe(res=>{
        this.categories = res.Value;
         this.categories.forEach(el=>{
          el.collapsed = false;
          if(el.sub){
            el.sub.forEach(sub => {
              sub.collapsed = false;
            });
          }
        });
        console.log("cccc",this.categories);
        
      })
    }

    getProjects(){
      this._task.getProjects().subscribe(res=>{
        this.projectsArr = res; 
      })
    }
    setSelectedCategory(p,value,event,index){
      event.stopPropagation()
      p.value.categoryId = value.id;
      this.projects().at(index).get('categoryName').setValue(value.name);
      this.projects().at(index).get('categoryId').setValue(value.id);
    }
    setParentSelectedCategory(p,value,index){
      p.value.categoryId = value.id;
      this.projects().at(index).get('categoryName').setValue(value.name);
      this.projects().at(index).get('categoryId').setValue(value.id);
    }
    setValues(){
        this._project.projects.subscribe(project=>{
          console.log("caa",project);
          
            if(project.id){
                    let elFormGroup = this.fb.group({
                        projectName:[project.projectName,Validators.required],
                        categoryId:[project.categoryId,Validators.required],
                        description:[project.description],
                        id:[project.id],
                        isDeleted:[false],
                        tasks:this.fb.array([])
                    })
                    this.projects().push(elFormGroup);
                    project.tasks.forEach(task=>{
                       let tasksForm = this.fb.group({
                        taskTitle:  [task.taskTitle,Validators.required],
                        startDate:  [task.startDate,Validators.required],
                        endDate:  [task.endDate],
                        assignedTo:  [task.assignedTo],
                        description:  [task.description],
                        // project:  [task.description],
                        id:  [task.id],
                        isDeleted:[false],
                        })
                    this.tasks(0).push(tasksForm)
                    })
                 
                    this.projectsForm.updateValueAndValidity();
            }else{
             this.addProject(0);
            }
        })
    }

    projects(): FormArray {
        return this.projectsForm.get('projects') as FormArray;
      }

    tasks(Index): FormArray {
        return this.projects().at(Index).get("tasks") as FormArray;
    }

    addProject(projectIndex) {
        this.projects().push(this.newProject());
        this.addTask(projectIndex);
      }

    addTask(index) {
        this.tasks(index).push(this.newTask());
      }
  
    newProject(): FormGroup {
        return this.fb.group({
        projectName:[,Validators.required],
        categoryId:[,Validators.required],
        categoryName:['selectCategory'],
        description:[],
        id:[null],
        isDeleted:[false],
        tasks:this.fb.array([])
        });
    }

    newTask(): FormGroup {
        return this.fb.group({
          taskTitle:  ['',Validators.required],
          startDate:  ['',Validators.required],
          endDate:  [''],
          assignedTo:  [''],
          description:  [''],
          // project:  [''],
          id:[null],
          isDeleted:[false],
        });
    }
    
      deleteProject(index){
          if(!this.checkProjectDelete()){
            let arr = this.projectsForm.get('projects') as FormArray;
            arr.removeAt(index);
            }
      }

      deleteTask(projectIndex:number,tasksIndex:number) {
          if(!this.checkTaskDelete(projectIndex)){
              this.tasks(projectIndex).removeAt(tasksIndex);
          }
      }

      checkProjectDelete(){
        let arr = this.projectsForm.get('projects') as FormArray;
       if(arr.length == 1) return true;
       return false;
      }

      checkTaskDelete(packgeIndex){
        let arr = this.projects().at(packgeIndex).get("tasks") as FormArray;
       if(arr.length == 1) return true;
       return false;
      }


      cancel(){
        this.router.navigate(['/projects/ProjectsList']);
      }
      submitForm(){
        this.manageProject();
      }
    
      manageProject(){
        const projects = this.projectsForm.value.projects;
        this._project.manageProject(projects).subscribe(res=>{
          if(this.Files.length > 0){
            this.uploadTasksFiles();
          }
        })
      }

      
      checkUploadFilesDisabled(taskTitle,startDate){
        if(taskTitle && startDate){
          return false;
        }else{
          return true;
        }
      }
      getFiles(event,taskTitle,startDate){
        let Files = event.target.files;
        if(Files.length > 0){
          let object = {taskTitle,startDate,Files}
          this.Files.push(object);
        }
      }
    
      uploadTasksFiles() {
        const Data = new FormData();
        console.log("this.Files",this.Files);
        Data.append('Files', this.Files)
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        var http = new HttpClient(this.handler);
        const req = new HttpRequest('PUT', `https://admin.xwar.app:2052/web/uploadTasksFiles`, Data, {
          headers: headers.set('authorization', `${this.token}`)
        });
        http.request(req).subscribe((success: any) => {
        if (success.type === 4) {
          this.router.navigate(['/projects/ProjectsList'])
          }
        })
      }

      getToday(){
        let today = new Date();
        return today;
      }

      checkDisable(){
        if(this.projectsForm.invalid) return true
        return false;
      }

    ngOnDestroy(){
      this._project.projects.next({});
      // this._project.projects.untasksscribe();
    }


}
