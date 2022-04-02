import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  Form:FormGroup;
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
   
    this.Form = fb.group({
    taskTitle:  ['',Validators.required],
    taskCategory:  [''],
    project:  [''],
    startDate:  ['',Validators.required],
    endDate:  [''],
    assignedTo:  [''],
    description:  [''],
    })
  }


  ngOnInit(): void {
    this.getcategories();
    this.setValues()
  }

  setValues(){
    this.share.updateItem.subscribe(item=>{
      if(Object.keys(item).length != 0){
        this.taskId = item.id;
       this.Form.controls.title.setValue(null)
        this.Form.controls.category.setValue(null)
        this.Form.controls.project.setValue(null)
        this.Form.controls.startDate.setValue(null)
        this.Form.controls.endDate.setValidators(null);
        this.Form.controls.assignedTo.setValidators(null);
        this.Form.controls.description.setValidators(null);
      }
    })
  }

  getStartDate(){
    return this.Form.controls.startDate.value;
  }

  getToday(){
    let today = new Date();
    return today;
  }

  getEndDate(){
    return this.Form.controls.endDate.value;
  }
  getcategories(){
    this._task.getcategories().subscribe(res=>{
      this.categories = res; 
      this.projects = res; 
     })
  }

  submitForm(){
    if(Object.keys(this.share.updateItem).length === 0) this.addTask();
    this.updatask()
  }
  addTask(){
    const body = this.Form.value;
    this._task.addTask(body).subscribe(res=>{
      this.cancel();
    })
  }
  updatask(){
    let body = this.Form.value;
    delete body.password;
    this._task.updatask(this.taskId,body).subscribe(res=>{
      this.cancel();
    })
  }



  checkDisable(){
    if(this.Form.invalid) return true
    return false;
  }

  cancel(){
    this.location.back();
  }

  ngOnDestroy(){
    this.share.updateItem.next({})
  }

}
