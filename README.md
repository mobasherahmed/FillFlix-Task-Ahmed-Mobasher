# FillFlixTask-AhmedMobasher rewritten in Angular9 and Material2

Simple Admin App built using Angular 9 and Material 2.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

### Introduction

Provides fast, reliable and extensible starter for the development of Angular projects.

`FillFilxTask-AhmedMobasher` provides the following features:

*   Developed using Material-v2.0.0
*   angular-v9.1.1
*   angular/cli-v9.1.1
*   angular/material-v9.2.0
*   angular/cdk-v9.2.0
*   angular/flex-layout-v9.0.0-beta.29
*   [ngx-translate-v11.0.1](https://github.com/ngx-translate).
*   Two Factor authentication with firebase.
*   Following the best practices.
*   Ahead-of-Time compilation support.
*   Official Angular i18n support.
*   Production and development builds.
*   Tree-Shaking production builds.

### How to start

**Note** that this seed project requires **node >=v10.13 and npm >=6**.

In order to start the project use:

```bash
$ git clone https://github.com/mobasherahmed/FillFlix-Task-Ahmed-Mobasher
$ cd FillFlixTask-AhmedMobasher
# install the project's dependencies
$ npm install
# watches your files and uses livereload by default run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
$ ng serve --o 
```
## Description of project 

# Login Page

![image](https://user-images.githubusercontent.com/48737204/154130999-5ed1847b-9239-41cd-9152-f4d096fe073c.png)

First page of application to authenticate user email and password then moving to next step,
after login token stored to localstorgae ..

# Two Factor Authentication ( 2FA )

![image](https://user-images.githubusercontent.com/48737204/154131325-65fed684-81fd-4108-9273-b4d0d651465c.png)

Second page to authenticate phone number user should add his number correctly with format required 12 number ex:201002883308 ..

**Note**  User cannot access any page of appliaction until complete 2FA step .

after complete this step he now verified to access other pages of appliaction and another key stored in localstorage 
that he complete all authentication steps successfully ..  

and page will be as below 

![image](https://user-images.githubusercontent.com/48737204/154132901-6f9f5c50-05a6-43a5-a263-981a3f9c7b60.png)

# Users page 

Third page that list all users from (https://reqres.in/) api listed in a mat-table ..

![image](https://user-images.githubusercontent.com/48737204/154133654-f14f90c1-96f0-4b81-b2f5-819f049f9e46.png)


# User page 

Fourth page that list one user listed in a mat-table ..

![image](https://user-images.githubusercontent.com/48737204/154133784-68ba8ee0-be96-44e9-8059-68d616a367b3.png)


** Note ** Third and Fourth page are already use one page from * Shared Module * call mat table ..

# Crud Page 

Fifth page have 3 buttons that called api's of (add-update-delete)

![image](https://user-images.githubusercontent.com/48737204/154133828-e417c09c-bc49-4b13-ad18-cb5381aafb5a.png)


# add-update 

use one dynamic modal (modal-form) from shared module componenents

# delete 

use confirmation modal from shared module componenents

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
