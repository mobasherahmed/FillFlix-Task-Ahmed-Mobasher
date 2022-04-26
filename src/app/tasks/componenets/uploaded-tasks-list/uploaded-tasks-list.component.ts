import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmationComponent } from 'src/app/shared/components/modal-confirmation/modal-confirmation.component';
import { EnumService } from 'src/app/shared/services/enum.service';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-uploaded-tasks-list',
  templateUrl: './uploaded-tasks-list.component.html',
  styleUrls: ['./uploaded-tasks-list.component.scss']
})
export class UploadedTasksListComponent implements OnInit {


  tasks: any[]=[];
  constructor(private _task:TasksService,public dialog: MatDialog,public num:EnumService) { 
      this.listUploadedTasks()
    }

  ngOnInit(): void {
  }

  listUploadedTasks(){
    this._task.getUploadedTasks().subscribe(res=>{
    this.tasks = res.Value;
    console.log("tasks",this.tasks);
    
   })
  }

  changeUploadedTaskStatus(taskId:number,customerId:number,status:number){
  const body = {taskId,customerId}
    this._task.changeUploadedTaskStatus(body,status).subscribe(res=>{})
  }

  openDeleteDialog(taskId:number,customerId:number,status:number){
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      data: {
          message: "Are you sure want to reject customer answers for this task ?",
          buttonText: {
              ok: "Ok",
              cancel: "No",
          },
          size:'lg'
      },
  });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.changeUploadedTaskStatus(taskId,customerId,status);
      }
  });
  }

}
