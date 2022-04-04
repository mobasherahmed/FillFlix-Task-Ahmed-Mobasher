import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
    

    constructor(
        private _project:ProjectsService,
        private fb:FormBuilder,
        private location:Location,
    ) {
        this.projectsForm = fb.group({
            projects: fb.array([])
        })
    }

    ngOnInit() { 
     
        // this.addProject(0);
        this.setValues();
    }

    setValues(){
        this._project.projects.subscribe(project=>{
          console.log("caa",project);
          
            if(project.id){
                    let elFormGroup = this.fb.group({
                        name:[project.name,Validators.required],
                        description:[project.description],
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
        this.projects().push(this.newproject());
        this.addtasksproject(projectIndex);
      }

    addtasksproject(index) {
        this.tasks(index).push(this.newtasks());
      }
  
    newproject(): FormGroup {
        return this.fb.group({
        name:[,Validators.required],
        description:[],
        id:[null],
        isDeleted:[false],
        tasks:this.fb.array([])
        });
    }

    newtasks(): FormGroup {
        return this.fb.group({
         name:[,Validators.required],
         description:[],
         id:[null],
         isDeleted:[false],
        });
    }
    
      deleteproject(index){
          if(!this.checkprojectDelete()){
            let arr = this.projectsForm.get('projects') as FormArray;
            // let item  = arr.at(index);
            // console.log("item",item);
            
            // item.get('isDeleted').setValue(true);
            // console.log("item",item);

            arr.removeAt(index);
            }
      }

      deletetasksproject(projectIndex:number,tasksIndex:number) {
          // if(!this.checktasksprojectDelete(projectIndex)){
              this.tasks(projectIndex).removeAt(tasksIndex);
          // }
      }

      checkprojectDelete(){
        let arr = this.projectsForm.get('projects') as FormArray;
       if(arr.length == 1) return true;
       return false;
      }

      checktasksprojectDelete(packgeIndex){
        let arr = this.projects().at(packgeIndex).get("tasks") as FormArray;
       if(arr.length == 1) return true;
       return false;
      }


      cancel(){
        this.location.back()
      }
      submitForm(){
        this.addprojects();
        //  this.updateProject()
      }
    
      addprojects(){
        const projects = this.projectsForm.value.projects;
        this._project.addProject(projects).subscribe(res=>{
          this.cancel();
        })
      }

      updateProject(){
        const categorId = this._project.projects.getValue().id;
        const projects = this.projectsForm.value.projects;
        this._project.updateProject(categorId,projects).subscribe(res=>{})
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
