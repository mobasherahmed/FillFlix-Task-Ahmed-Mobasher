import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { LoginService } from '../login/login.service';
import { ValidationService } from '../shared/services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  hide:boolean=true;

	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}
  
  RegisterForm:FormGroup
  confirmPassword = new FormControl('', Validators.required) 
  constructor(private fb:FormBuilder,private translate:TranslateService,private validation:ValidationService,
    private _auth:LoginService) { 
   
    this.RegisterForm = fb.group({
    name:  ['',Validators.required],
    email:  ['',[Validators.required,Validators.pattern(validation.email)]],
    phoneNumber:  ['',[Validators.required,Validators.pattern(validation.phone)]],
    password:  ['',[Validators.required,Validators.pattern(validation.password)]],
    })
  }


  ngOnInit(): void {
    this.watchPassworsValues();
  }

  onRegister(){
    const body = this.RegisterForm.value;
    this._auth.Register(body).subscribe(res=>{
    })
  }

  watchPassworsValues(){
    this.RegisterForm.controls.password.valueChanges.subscribe(password=>{
      this.confirmPassword.reset();
     
    })
    this.confirmPassword.valueChanges.subscribe(password=>{
      if(password === this.RegisterForm.controls.password.value) return;
      this.confirmPassword.setErrors({match:true}); 
    })
  }

  checkDisable(){
    if(this.RegisterForm.invalid || this.confirmPassword.invalid) return true
    return false;
  }
}
