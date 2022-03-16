import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  restPassForm:FormGroup;
  constructor(private _auth:AuthService,private fb:FormBuilder,private router:Router) { 
    this.restPassForm = fb.group({
      secret_code:['',Validators.required],
      password:['',Validators.required],
      confirmPassword:['',Validators.required],
    })
  }

  ngOnInit(): void {
  }

  onChange(event) {
    if (event === this.restPassForm.value.password) {
      this.restPassForm.controls.confirmPassword.setErrors({match:false})
      this.restPassForm.controls.confirmPassword.updateValueAndValidity();
    } else {
      this.restPassForm.controls.confirmPassword.setErrors({match:true})
    }
  }
  resetPassword(param){
   const body = this.restPassForm.value;
   delete body.confirmPassword;
    this._auth.resetPassword(body).subscribe(res=>{
      this.router.navigate(['/login'])
    })
  }
}
