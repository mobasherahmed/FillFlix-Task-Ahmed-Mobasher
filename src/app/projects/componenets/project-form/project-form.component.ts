import { DatePipe, Location } from '@angular/common';
import { HttpBackend, HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/categories/services/category.service';
import { EnumService } from 'src/app/shared/services/enum.service';
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
    token: string='';
    Files: any=[];
    projectsArr: any[];
  File: any;
  types: any;
  currencies: any;
  survies: any;

    constructor(
        private _project:ProjectsService,
        private _category:CategoryService,
        private fb:FormBuilder,
        private location:Location,
        private router:Router,
        public handler: HttpBackend,
        private _task:TasksService,
        private datePipe: DatePipe,
        private toaster:ToastrService,
        private num:EnumService
    ) {
        this.projectsForm = fb.group({
            projects: fb.array([])
        })
    }

    ngOnInit() { 
        this.setValues();
        this.getCategories();
        this.getProjects();
        this.getTypes();
        this.getSurvies();
        this.getCurrencies();
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
        this.projectsArr = res.Value; 
      })
    }

    getTypes(){
      this._task.getTaskTypes(this.num.taskTypes).subscribe(res=>{
        this.types = res.Value; 
      })
    }
    getCurrencies(){
      this._task.getCurrencies(this.num.currecies).subscribe(res=>{
        this.currencies = res.Value; 
      })
    }

    getSurvies(){
      this._task.getSurvey().subscribe(res=>{
        this.survies = res.Value; 
      })
    }
    setSelectedCategory(p,value,event,index){
      event.stopPropagation()
      p.value.categoryId = value.id;
      this.projects().at(index).get('categoryName').setValue(value.name);
      this.projects().at(index).get('categoryId').setValue(value.id);
      // document.getElementById('dropdown-basic').classList.remove('show')

    }
    setParentSelectedCategory(p,value,index){
      p.value.categoryId = value.id;
      this.projects().at(index).get('categoryName').setValue(value.name);
      this.projects().at(index).get('categoryId').setValue(value.id);
      // document.getElementById('dropdown-basic').classList.remove('show')
    }
    setValues(){
        this._project.projects.subscribe(project=>{
          console.log("caa",project);
          
            if(project.id){
                    let elFormGroup = this.fb.group({
                        projectName:[project.projectName,Validators.required],
                        categoryId:[project.categoryId,Validators.required],
                        categoryName:[project.categoryName],
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
                        currency:  [task.currencyId],
                        surveyId:  [task.surveyId],
                        price:  [task.price],
                        type:  [task.typeId],
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
          currency:['',Validators.required],
          price:['',Validators.required],
          type:['',Validators.required],
          surveyId:  [''],
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
        if(this.Files.length > 0){        
          if(this.checkFilesSize()){
          this.callManageProjectsApi();
          }
        }else{
          this.callManageProjectsApi();
        }
      }

      callManageProjectsApi(){
        const projects = this.projectsForm.value.projects;
        this._project.manageProject(projects).subscribe(res=>{
        if(this.Files.length > 0){        
          this.uploadTasksFiles();
        }else{
          this.router.navigate(['/projects/ProjectsList'])
        }
        })
      }

      checkFilesSize(){
        let size=0;
        for (let i = 0; i < this.Files.length; i++) {
          for(let j=0;j<this.Files[i].attachments.length;j++){
            size += this.Files[i].attachments[j].size;
          }
          console.log("Size",size);
            // 10 MB (this size is in bytes)
          if(size > 10485760){
            this.toaster.error(`Uploaded Files Size is too large ${size}`,' Maximum size is 10MB');
            return false;
          }else{
            return true;
          }
          
        }
      }
      
      checkUploadFilesDisabled(taskTitle,startDate){
        if(taskTitle && startDate){
          return false;
        }else{
          return true;
        }
      }
      getFiles(event,taskTitle,startDate){
        // this.Files = event.target.files;
        let attachments = event.target.files;
        startDate = this.datePipe.transform(startDate, "yyyy-MM-dd");
        if(attachments.length > 0){
          let object = {taskTitle,startDate,attachments}
          this.Files.push(object);
        }
      }
    
      uploadTasksFiles() {
        const Data = new FormData();
        console.log("files",this.Files);
        for (let i = 0; i < this.Files.length; i++) {
          for(let j=0;j<this.Files[i].attachments.length;j++){
            const key = this.Files[i].taskTitle +'-'+ this.Files[i].startDate;
            Data.append(key,this.Files[i].attachments[j])
          }
        }
    
      
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        var http = new HttpClient(this.handler);
        const req = new HttpRequest('POST', `https://admin.xwar.app:2052/web/uploadTasksFiles`, Data, {
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
