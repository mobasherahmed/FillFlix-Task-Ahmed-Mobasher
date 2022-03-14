import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { dropdownSettings } from 'src/app/shared/interfaces/multi-selection-interfaces';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { createRoleAndItsPermissionsRequestDto, multiSelectionDto } from '../../dataModels/management-interfaces';
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
  screenButtons: multiSelectionDto[];
  ruleId: number;

  constructor(private fb:FormBuilder,private management:ManagementSystemService,
    private toaster:ToastrService,private share:SharedDataService,private location:Location) {
    this.Form = this.fb.group({
      name:['',Validators.required],
      permission:['',Validators.required],
      buttons:[''],
    })
    this.dropdownSettings = this.share.dropdownSettings
   
   }

  ngOnInit(): void {
    this.getPermissions();
    this.getSelectedScreensId();
    this.setValues()
  }

  

  setValues(){
    this.share.updateItem.subscribe(item=>{
      if(Object.keys(item).length != 0){
       this.ruleId = item.id;
       this.Form.controls.name.setValue(item.name)
        let screens = item.permissions.filter(p=>p.permissionType === 1).map(s=>{
          return {id:s.permissionId,name:s.permissionName}
        });
        let buttons = item.permissions.filter(p=>p.permissionType === 2).map(s=>{
          return {id:s.permissionId,name:s.permissionName}
        });
        this.Form.controls.permission.setValue(screens)
        this.Form.controls.buttons.setValue(buttons)

      }
    })
  }
 
  getPermissions(){
    this.management.getPermissions().subscribe(res=>{
      this.permissions = res.Value.map(p=>{
        return {id:p.id,name:p.permissionName}
      })
    })
  }

  checkDisable(){
    return this.Form.invalid
  }

  getSelectedScreensId(){
    if(this.Form.controls.permission.valid){
      return this.Form.controls.permission.value.map(p=>p.id);
    }
  }


  getScreenButtons(){
    const screenId : number[] = this.getSelectedScreensId();
    this.management.getScreenButtons(screenId).subscribe(res=>{
      this.screenButtons = res.Value.map(p=>{
        return {id:p.id,name:p.permissionName + '-' + p.screenName}
      })
    })
   
  }

  cancel(){
    this.location.back();
  }

  getPermissionsIds(){
   const screenIds= this.Form.controls.permission.value.map(s=>s.id);
   const buttonIds = this.Form.controls.buttons.value.map(b=>b.id);
   const permissionIds = [...screenIds,...buttonIds];
   return permissionIds;
  }

  addRule(){
    let body:createRoleAndItsPermissionsRequestDto={
      name:this.Form.value.name,
      permissionId : this.getPermissionsIds(),
      roleId:this.ruleId?this.ruleId:null
    };

    this.management.createRoleAndItsPermissions(body).subscribe(res=>{
      this.cancel();
     })

  }

  ngOnDestroy(){
    this.share.updateItem.next({})
    
  }
}
