import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { dropdownSettings } from 'src/app/shared/interfaces/multi-selection-interfaces';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { XappApiService } from 'src/app/shared/services/xapp-api.service';
import { multiSelectionDto, permission, permissions } from '../../dataModels/management-interfaces';
import { ManagementSystemService } from '../../services/management-system.service';

@Component({
  selector: 'app-access-rules-form',
  templateUrl: './access-rules-form.component.html',
  styleUrls: ['./access-rules-form.component.scss']
})
export class AccessRulesFormComponent implements OnInit {

  Form:FormGroup;
  dropdownSettings:dropdownSettings;
  permissions:multiSelectionDto[];

  constructor(private fb:FormBuilder,private management:ManagementSystemService,
    private toaster:ToastrService,private share:SharedDataService) {
    this.Form = this.fb.group({
      name:['',Validators.required],
      permissionType:['1',Validators.required],
      permission:['',Validators.required],
      screenId:[''],
      buttons:[''],
    })
    this.dropdownSettings = this.share.dropdownSettings
   
   }

  ngOnInit(): void {
    // screen of application;
    this.getPermissions();
    this.watchPermissionTypeControlValue();
  }

  getPermissions(){
    this.management.getPermissions().subscribe(res=>{
      console.log("r",res);
      this.permissions = res.Value.map(p=>{
        return {id:p.id,name:p.permissionName}
      })
    })
  }

  checkDisable(){
    return this.Form.invalid
  }

  watchPermissionTypeControlValue(){
    this.Form.controls.permissionType.valueChanges.subscribe(type=>{
      console.log(type);
      
      type == 1 ? this.toggleControlsRequired('unrequired') :
      this.toggleControlsRequired('required');
    })
  }

  toggleControlsRequired(type){
    console.log('validation');
    if(type === 'required'){
      this.Form.controls.screenId.setValidators([Validators.required])
      this.Form.controls.buttons.setValidators([Validators.required])
      this.Form.controls.permission.setValidators(null)
      this.Form.controls.permission.updateValueAndValidity();
      this.Form.controls.screenId.updateValueAndValidity();
      this.Form.controls.buttons.updateValueAndValidity();
    }else{
      this.Form.controls.screenId.setValidators(null)
      this.Form.controls.buttons.setValidators(null)
      this.Form.controls.permission.setValidators([Validators.required])
      this.Form.controls.permission.updateValueAndValidity();
      this.Form.controls.screenId.updateValueAndValidity();
      this.Form.controls.buttons.updateValueAndValidity();
    }

  }

  getScreenButtons(){
    const screenId : number = this.Form.controls.screenId.value;
    console.log("screenId",screenId);
    
    this.management.getScreenButtons(screenId).subscribe(res=>{
      console.log("buttons",res);
      
    })
   
  }

  cancel(){

  }

  addRule(){
console.log(this.Form.valid);
console.log(this.Form);

  }

}
