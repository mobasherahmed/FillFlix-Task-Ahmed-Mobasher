import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-code-activation',
  templateUrl: './code-activation.component.html',
  styleUrls: ['./code-activation.component.scss']
})
export class CodeActivationComponent implements OnInit {

  verifyForm:FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  resendEmail(){}

  veifyCode(value){}

}
