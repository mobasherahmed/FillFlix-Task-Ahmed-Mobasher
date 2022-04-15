import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SurveyService } from '../../sevices/survey.service';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit  {

    SurveyForm:FormGroup;
    questionIndex: any;
    answerTypes:any
  showAlert: boolean = false;

    constructor(
        private _survey:SurveyService,
        private fb:FormBuilder,
        private router:Router,
        private toaster:ToastrService
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
      this._survey.getanswerTypes(3).subscribe(res=>{
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

    getSelectedAnswerType(type,questionIndex){
      if(type == 6){
        this.addAnswer(questionIndex);
        this.showAlert=true;
        this.Questions().at(questionIndex).get('alert').setValue(true);
      }else{
        this.Answers(questionIndex).clear();
        this.showAlert=false;
        this.Questions().at(questionIndex).get('alert').setValue(false);

      }
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
       this.router.navigate(['/surveies/SurveiesList'])
        
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
