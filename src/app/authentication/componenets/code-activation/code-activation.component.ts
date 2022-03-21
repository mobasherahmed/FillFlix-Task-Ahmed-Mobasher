import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-code-activation',
  templateUrl: './code-activation.component.html',
  styleUrls: ['./code-activation.component.scss']
})
export class CodeActivationComponent implements OnInit {

  activationCode = new FormControl('',Validators.required)
  constructor(private _auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
 
  veifyCode(code){
    this._auth.activeUser(code).subscribe(verify=>{
      this.router.navigate(['/login'])
    })
  }

  resendEmail(){
    const body = {"email": this._auth.userEmail.getValue()};
    this._auth.resendEmail(body).subscribe(result => {
    })
  }

}
