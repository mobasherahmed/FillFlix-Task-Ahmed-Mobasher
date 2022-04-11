import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FeatureService } from 'src/app/features/services/feature.service';
import { ModalConfirmationComponent } from 'src/app/shared/components/modal-confirmation/modal-confirmation.component';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks-list-mat-table',
  templateUrl: './tasks-list-mat-table.component.html',
  styleUrls: ['./tasks-list-mat-table.component.scss']
})
export class TasksListMatTableComponent implements OnInit {

  displayedColumns = ['no', 'name', 'startDate','endDate','Description','status','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  tasks: any[]=[];
  constructor(public share:SharedDataService,private _task:TasksService,public dialog: MatDialog,
    private router:Router) { 
    this.listTasks();
  }

  ngOnInit(): void {

  }

  listTasks(){
    this._task.getAllTasks().subscribe(res=>{
    this.tasks = res.Value;
    this.dataSource = new MatTableDataSource(res.Value);
    this.dataSource.paginator = this.paginator;

   })
  }

  editTask(task){
    this._task.tasks.next(task);
    this.router.navigate(['/tasks/TaskForm'])
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
        this._task.deleteTask(id).subscribe(res=>{
         this.tasks = this.tasks.filter(item=>item.id !== id);
         this.dataSource = new MatTableDataSource(this.tasks)
        })
      }
  });
  }

}
