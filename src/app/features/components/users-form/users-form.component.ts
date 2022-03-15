import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { ManagementSystemService } from 'src/app/management-system/services/management-system.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { FeatureService } from '../../services/feature.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {
  hide:boolean=true;
  Form:FormGroup
  confirmPassword = new FormControl('', Validators.required) 
  roles: any;
  hidePasswords: boolean = false;
  constructor(private fb:FormBuilder,private translate:TranslateService,private validation:ValidationService,
    private _feature:FeatureService,private _management:ManagementSystemService,private location:Location,private share:SharedDataService) { 
   
    this.Form = fb.group({
    name:  ['',Validators.required],
    email:  ['',[Validators.required,Validators.pattern(validation.email)]],
    phoneNumber:  ['',[Validators.required,Validators.pattern(validation.phone)]],
    password:  ['',[Validators.required,Validators.pattern(validation.password)]],
    roleId:  ['',Validators.required],
    })
  }


  ngOnInit(): void {
    this.watchPassworsValues();
    this.getRoles();
    this.setValues()
  }

  setValues(){
    this.share.updateItem.subscribe(item=>{
      if(Object.keys(item).length != 0){
       this.Form.controls.name.setValue(item.name)
        this.Form.controls.email.setValue(item.email)
        this.Form.controls.phoneNumber.setValue(item.phoneNumber)
        this.Form.controls.roleId.setValue(item.roleId)
        this.Form.controls.password.setValidators(null);
        this.confirmPassword.setValidators(null);
        this.confirmPassword.updateValueAndValidity();
        this.hidePasswords = true;
      }
    })
  }
  getRoles(){
    this._management.getRoles().subscribe(res=>{
      this.roles = res.Value; 
     })
  }

  addUser(){
    const body = this.Form.value;
    this._feature.addUser(body).subscribe(res=>{
      console.log("res",res);
      this.cancel();
    })
  }

  watchPassworsValues(){
    this.Form.controls.password.valueChanges.subscribe(password=>{
      this.confirmPassword.reset();
     
    })
    this.confirmPassword.valueChanges.subscribe(password=>{
      if(password === this.Form.controls.password.value) return;
      this.confirmPassword.setErrors({match:true}); 
    })
  }

  checkDisable(){
    if(this.Form.invalid || this.confirmPassword.invalid) return true
    return false;
  }

  cancel(){
    this.location.back();
  }

  ngOnDestroy(){
    this.share.updateItem.next({})
  }

}
