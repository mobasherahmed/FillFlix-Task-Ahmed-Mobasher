import { HttpBackend, HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EnumService } from 'src/app/shared/services/enum.service';
import { SurveyService } from '../../sevices/survey.service';
import * as uuid from "uuid";

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit  {

    SurveyForm:FormGroup;
    questionIndex: any;
    answerTypes:any;
    answerss:number = 1;
    questions:number = 1;
    showAlert: boolean = false;
    answerType: any;
    token: any;
  Files: any[]=[];

    constructor(
        private _survey:SurveyService,
        private fb:FormBuilder,
        private router:Router,
        private toaster:ToastrService,
        public num:EnumService,
        public handler: HttpBackend
    ) {
        this.SurveyForm = fb.group({
            name:['',Validators.required],
            id:[null],
            questions: fb.array([])
        })
    }

    ngOnInit() {
        this.setValues();
        this.getanswerTypes();
    }

    getanswerTypes(){
      this._survey.getanswerTypes(this.num.answerTypes).subscribe(res=>{
        this.answerTypes = res.Value;
      })
    }

    setValues(){
        this._survey.survey.subscribe(survey=>{
          console.log("caa",survey);

            if(survey.id){
                    this.survey().get('name').setValue(survey.name);
                    this.survey().get('id').setValue(survey.id);
                    // this.survey().get('questions').setValue(this.fb.array([]));
                    survey.questions.forEach((question,index)=>{
                       let questionForm = this.fb.group({
                        question:  [question.question,Validators.required],
                        answerType:  [question.answerTypeId,Validators.required],
                        id:  [question.id],
                        alert:  [false],
                        answers: this.fb.array([])

                        })
                       this.Questions().push(questionForm);
                       if(question.answers?.length>0){
                         question.answers.forEach(answer=>{
                           let answerForm = this.fb.group({
                            answer:  [answer.answer,Validators.required],
                            id:[answer.id]
                           })
                           this.Answers(index).push(answerForm);
                         })
                       }
                    })


                    this.SurveyForm.updateValueAndValidity();
            }else{
             this.addQuestion();
            }
        })
    }

    addSurvey(){
      this.SurveyForm = this.fb.group({
        name:['',Validators.required],
        id:[null],
        questions: this.fb.array([])
    })
    }

    survey():FormGroup {
      return this.SurveyForm;
    }

    Questions(): FormArray {
      return this.survey().get("questions") as FormArray;
     }

     Answers(index){
      let arr = this.survey().get("questions") as FormArray;
      return arr.at(index).get('answers') as FormArray;
     }

     resertNumOfAnsAndQues(){
      this.answerss=1;
      this.questions=1;
     }
    getSelectedAnswerType(type,questionIndex){
      console.log("type",type);
      
      if(type == 10 || type == 23){
        this.Answers(questionIndex).clear();
        this.addAnswer(questionIndex);
        this.showAlert=true;
        this.answerType=type;
        this.Questions().at(questionIndex).get('alert').setValue(true);
        if(type ==23){
          let uuid = this.generateUUId();
          this.Questions().at(questionIndex).get('uuid').setValue(uuid);
        }
      }else{
        this.Answers(questionIndex).clear();
        this.showAlert=false;
        this.answerType=type;
        this.Questions().at(questionIndex).get('alert').setValue(false);

      }
    }

    getFiles(event,questionIndex){
      let file = event.target.files[0];
      if(file){
        let uuid = this.Questions().at(questionIndex).get('uuid').value;
        let object = {uuid,file}
        this.Files.push(object);
      }
    } 

    generateUUId(){
    return uuid.v4();
    }

    uploadQuestionImages() {
      const Data = new FormData();
      for (let i = 0; i < this.Files.length; i++) {
          const key = this.Files[i].uuid;
          Data.append(key,this.Files[i].file)
      }
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      var http = new HttpClient(this.handler);
      const req = new HttpRequest('POST', `https://admin.xwar.app:2052/web/uploadImageChoice`, Data, {
        headers: headers.set('authorization', `${this.token}`)
      });
      http.request(req).subscribe((success: any) => {
        console.log("s",success);
        if(success.type ==4){
        this.router.navigate(['/surveies/SurveiesList'])
        }
      })
    }
    addQuestion() {
        this.Questions().push(this.newQuestion());
      }

    addAnswer(index) {

       this.Answers(index).push(this.newAnswer());
      }

      addMuliAnswers(questionIndex,Count) {
        this.Answers(questionIndex).clear();
      if(Count>1){
        for(let i=0;i<Count;i++){
          this.addAnswer(questionIndex);
        }
      }else{
        this.addAnswer(questionIndex);
      }
      }

      addMuliQuestions(Count) {
        this.Questions().clear();
      if(Count>1){
        for(let i=0;i<Count;i++){
          this.addQuestion();
        }
      }else{
        this.addQuestion();
      }
      }


      newQuestion(): FormGroup {
        return this.fb.group({
          question:  ['',Validators.required],
          answerType:  ['',Validators.required],
          id:[null],
          uuid:[null],
          alert:[false],
          answers: this.fb.array([])
        });
    }

    newAnswer(): FormGroup {
        return this.fb.group({
          answer:  ['',Validators.required],
          id:[null]
        });
    }



      deleteQuestion(questionIndex:number) {
          if(!this.checkQuestionDelete()){
              this.Questions().removeAt(questionIndex);
          }
      }

      deleteAnswer(questionIndex:number,answerIndex:number) {
          if(!this.checkAnswerDelete(questionIndex)){
              this.Answers(questionIndex).removeAt(answerIndex);
          }
      }


      checkQuestionDelete(){
        let arr = this.survey().get("questions") as FormArray;
       if(arr.length == 1) return true;
       return false;
      }

      checkAnswerDelete(questionIndex){
        let arr = this.Answers(questionIndex) as FormArray;
        console.log("answers",arr);

       if(arr.length == 1) return true;
       return false;
      }


      cancel(){
        this.router.navigate(['/surveies/SurveiesList']);
      }

      submitForm(){
        this.managesurvey();
      }

      managesurvey(){
        const survey = this.SurveyForm.value;
        this._survey.manageSurvey(survey).subscribe(res=>{
          this.uploadQuestionImages();
        })
      }

      checkDisable(){
        if(this.SurveyForm.invalid) return true
        return false;
      }

    ngOnDestroy(){
      this._survey.survey.next({});
      // this._survey.questions.unquestionsscribe();
    }


}
