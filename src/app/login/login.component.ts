import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { XappApiService } from '../shared/services/xapp-api.service';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    
    email = new FormControl('xapp@gmail.com', [Validators.required, Validators.email]) //eve.holt@reqres.in
    password = new FormControl('123456', Validators.required) //cityslicka
    constructor(private router: Router,private fb:FormBuilder,private xapp:XappApiService,
        private toaster:ToastrService,private translate:TranslateService,private _login:LoginService) {
            this.translate.use('en');
            localStorage.setItem('lang','en');
         }

    ngOnInit() { 
    }

    getEmailErrorMessage() {
        if (this.email.hasError('required')) {
          return this.translate.instant('You must enter email') ;
        }
    
        return this.email.hasError('email') ? this.translate.instant('emailValidation') : '';
    }

    checkDisable(){
        if(this.email.invalid || this.password.invalid) return true;
        return false;
    }
    showResetPassword(){
        
    }
    onLogin() {
        let user = {
            email : this.email.value,
            password : this.password.value,
        }
        this._login.login(user).subscribe(res=>{
            localStorage.setItem('token', res.accessToken);
            this.router.navigate(['/features/phone']);
        })
    }
}
