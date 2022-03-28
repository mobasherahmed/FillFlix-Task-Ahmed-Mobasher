import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FeatureService } from 'src/app/features/services/feature.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-tasks-list-mat-table',
  templateUrl: './tasks-list-mat-table.component.html',
  styleUrls: ['./tasks-list-mat-table.component.scss']
})
export class TasksListMatTableComponent implements OnInit {

  displayedColumns = ['no', 'name', 'role','phoneNumber','email','status','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  users: any[]=[];
  constructor(public share:SharedDataService,private _feature:FeatureService) { }

  ngOnInit(): void {
  }

  listUsers(){
    this._feature.listUsers().subscribe(res=>{
    this.users = res.Value;
    this.dataSource = new MatTableDataSource(res.Value);

   })
  }

}
