import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../authentication/services/auth.service';
import { CustomizerService } from '../shared/services/customizer.service';
import { NavService } from '../shared/services/nav.service';
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
    constructor(private router: Router,private fb:FormBuilder,private xapp:XappApiService,private _auth:AuthService,private customize:CustomizerService,
        private toaster:ToastrService,private translate:TranslateService,private _login:LoginService,private _navService:NavService) {
            translate.setDefaultLang('en');
            customize.setLayoutType('ltr')
            localStorage.setItem('lang','en')
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
    forgetPassword(){
        if(this.email.valid){
            const body = {'email':this.email.value}
            this._auth.forgetPassword(body).subscribe(res=>{
                this.router.navigate(['/authentication/forgetPassword'])
            })
        }else{
            this.toaster.error('Please Enter your valid email');
        }
    }
    onLogin() {
        this._auth.userEmail.next(this.email.value);
        let user = {
            email : this.email.value,
            password : this.password.value,
        }
        this._login.login(user).subscribe(res=>{
            localStorage.setItem('token', res.accessToken);
            this._navService.items.next(res.leftMenu)
            this.router.navigate(['/features/users']);
        })
    }
}
