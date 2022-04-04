import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/categories/services/category.service';
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

    constructor(
        private _project:ProjectsService,
        private _category:CategoryService,
        private fb:FormBuilder,
        private location:Location,
    ) {
        this.projectsForm = fb.group({
            projects: fb.array([])
        })
    }

    ngOnInit() { 
        this.setValues();
        this.getCategories();
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

    setSelectedCategory(p,value,event){
      console.log("ava",value);
      console.log("p",p);
      event.stopPropagation()
      p.value.category = value.id;
      this.selectedCategory = value.name;
    }
    setParentSelectedCategory(p,value){
      console.log("ava",value);
      console.log("p",p);
      
      p.value.category = value.id;
      this.selectedCategory = value.name;
    }
    setValues(){
        this._project.projects.subscribe(project=>{
          console.log("caa",project);
          
            if(project.id){
                    let elFormGroup = this.fb.group({
                        name:[project.name,Validators.required],
                        description:[project.description],
                        category:[project.category],
                        id:[project.id],
                        isDeleted:[false],
                        tasks:this.fb.array([])
                    })
                    this.projects().push(elFormGroup);
                    project.tasks.forEach(tasks=>{
                       let tasksForm = this.fb.group({
                            name:[tasks.name,Validators.required],
                            description:[tasks.description],
                            isDeleted:[false],
                            id:[tasks.id],
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
        name:[,Validators.required],
        category:[,Validators.required],
        description:[],
        id:[null],
        isDeleted:[false],
        tasks:this.fb.array([])
        });
    }

    newTask(): FormGroup {
        return this.fb.group({
         name:[,Validators.required],
         description:[],
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
          // if(!this.checkTaskDelete(projectIndex)){
              this.tasks(projectIndex).removeAt(tasksIndex);
          // }
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
        this.location.back()
      }
      submitForm(){
        this.manageProject();
      }
    
      manageProject(){
        const projects = this.projectsForm.value.projects;
        this._project.manageProject(projects).subscribe(res=>{
          this.cancel();
        })
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
