import { Component, OnInit } from "@angular/core";
import { WindowService } from "src/app/shared/services/window.service";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
    selector: "app-phone-login",
    templateUrl: "./phone-login.component.html",
    styleUrls: ["./phone-login.component.scss"],
})
export class PhoneLoginComponent implements OnInit {
    windowRef: any;
    verificationCode: string;
    phone:string;
    authenticated: boolean = false;
    constructor(private win: WindowService,private toaster:ToastrService,private router:Router) {
        if(localStorage.getItem('2FA') === 'true') this.authenticated = true;
    }

    ngOnInit() {
        this.windowRef = this.win.windowRef;
        this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container"
        );
        this.windowRef.recaptchaVerifier.render();
    }

    sendLoginCode() {
        const appVerifier = this.windowRef.recaptchaVerifier;
        const num = `+${this.phone}`;
        firebase.auth()
            .signInWithPhoneNumber(num, appVerifier)
            .then((result) => {
                this.windowRef.confirmationResult = result;
            })
            .catch((error) => this.toaster.error(error));
    }

    verifyLoginCode() {
        this.windowRef.confirmationResult
            .confirm(this.verificationCode)
            .then((result) => {
                this.toaster.success(`You have successfully logged in with your phone number UserId: ${result.user?.uid}`,'2FA Success');
                localStorage.setItem('2FA','true');
                this.authenticated = true;
                this.router.navigate(['/features/users']);
            })
            .catch((error) => this.toaster.error(error, "Incorrect code entered?"));
    }
}
