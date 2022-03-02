import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  RegisterForm:FormGroup
  email = new FormControl('', [Validators.required, Validators.email]) //eve.holt@reqres.in
  password = new FormControl('', Validators.required) //cityslicka
  constructor(private fb:FormBuilder) { 
    this.RegisterForm = fb.group({
    email:  ['',[Validators.required, Validators.email]],
    phone:  ['',Validators.required],
    password:  ['',Validators.required],
    confirmPassword:  ['',Validators.required],

    })
  }


  ngOnInit(): void {
  }

  onRegister(){

  }

  checkDisable(){

  }
}
