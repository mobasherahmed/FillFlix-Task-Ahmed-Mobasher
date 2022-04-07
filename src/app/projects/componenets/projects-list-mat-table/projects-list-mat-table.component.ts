import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalConfirmationComponent } from 'src/app/shared/components/modal-confirmation/modal-confirmation.component';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects-list-mat-table',
  templateUrl: './projects-list-mat-table.component.html',
  styleUrls: ['./projects-list-mat-table.component.scss']
})
export class ProjectsListMatTableComponent implements OnInit {

  projects: any[]=[];
  constructor(public share:SharedDataService,private _project:ProjectsService,public dialog: MatDialog,
    private router:Router) { 
      this.listProjects()
    }

  ngOnInit(): void {
  }

  listProjects(){
    this._project.getProjects().subscribe(res=>{
    this.projects = res.Value;
   })
  }

  editProject(project){
    this._project.projects.next(project);
    this.router.navigate(['/projects/ProjectForm'])
  }

  openDeleteDialog(id:number){
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
        this._project.deleteProject(id).subscribe(res=>{
         this.projects = this.projects.filter(item=>item.id !== id);
        })
      }
  });
  }


}
