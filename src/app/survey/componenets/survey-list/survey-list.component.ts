import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalConfirmationComponent } from 'src/app/shared/components/modal-confirmation/modal-confirmation.component';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { SurveyService } from '../../sevices/survey.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit {

  surveies: any[]=[];
  constructor(public share:SharedDataService,private _survey:SurveyService,public dialog: MatDialog,
    private router:Router) { 
      this.listSurvey()
    }

  ngOnInit(): void {
  }

  listSurvey(){
    this._survey.getSurvey().subscribe(res=>{
    this.surveies = res.Value;
    
   })
  }

  editSurvey(project){
    this._survey.survey.next(project);
    this.router.navigate(['/surveies/SurveiesForm'])
  }

  openDeleteDialog(id:number,type:string){
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      data: {
          message: "Are you sure want to delete?",
          buttonText: {
              ok: "Ok",
              cancel: "No",
          },
      },
  });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this._survey.deleteSurvey(id,type).subscribe(res=>{
         this.surveies = this.surveies.filter(item=>item.id !== id);
        })
      }
  });
  }


}
