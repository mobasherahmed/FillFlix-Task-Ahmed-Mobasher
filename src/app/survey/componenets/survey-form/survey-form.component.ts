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
                    survey.questions.forEach(question=>{
                       let questionForm = this.fb.group({
                        question:  [question.question,Validators.required],
                        answerType:  [question.answerTypeId,Validators.required],
                        id:  [question.id]
                        })
                        console.log("this.Questions()",this.Questions());
                        
                    this.Questions().push(questionForm)
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


  
    addQuestion() {
        this.Questions().push(this.newQuestion());
      }
  

      newQuestion(): FormGroup {
        return this.fb.group({
          question:  ['',Validators.required],
          answerType:  ['',Validators.required],
          id:[null],
        });
    }
    
 

      deleteQuestion(questionIndex:number) {
          if(!this.checkQuestionDelete()){
              this.Questions().removeAt(questionIndex);
          }
      }


      checkQuestionDelete(){
        let arr = this.survey().get("questions") as FormArray;
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
