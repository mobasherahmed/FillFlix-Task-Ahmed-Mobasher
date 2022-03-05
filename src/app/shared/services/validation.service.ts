import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public email : string | RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  public phone: string | RegExp = /(^[0-9]{7,15}$)/;
  public url: string | RegExp = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  public password: string | RegExp = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
  public en = /^[a-zA-Z0-9-','.'&'!'@'-'$'%'(')' \n]+$/;
  public ar= /^[\u0621-\u064A0-9','؛'.'&'!'@'$'%'(')' \n ]+$/;
  
  constructor() { }
}
