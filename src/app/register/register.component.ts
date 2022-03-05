import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
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
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});

	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}
  
  RegisterForm:FormGroup
  email = new FormControl('', [Validators.required, Validators.email]) //eve.holt@reqres.in
  password = new FormControl('', Validators.required) //cityslicka
  constructor(private fb:FormBuilder,private translate:TranslateService,private validation:ValidationService) { 
    this.translate.use('en')
    this.RegisterForm = fb.group({
    email:  ['',[Validators.required,Validators.pattern(validation.email)]],
    phone:  ['',[Validators.required,Validators.pattern(validation.phone)]],
    password:  ['',[Validators.required,Validators.pattern(validation.password)]],
    confirmPassword:  ['',Validators.required],

    })
  }


  ngOnInit(): void {
  }

  onRegister(){

  }

  getEmailErrorMessage(){}

  checkDisable(){

  }
}
