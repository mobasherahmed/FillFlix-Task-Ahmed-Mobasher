import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  restPassForm:FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  onChange(e){

  }

  resetPassword(value){
    
  }
}
