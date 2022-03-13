import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ManagementSystemService } from 'src/app/management-system/services/management-system.service';
import { User } from '../../interfaces/user-interface';
import { SharedDataService } from '../../services/shared-data.service';
import { XappApiService } from '../../services/xapp-api.service';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss'],
})
export class MatTableComponent implements OnInit {

  displayedColumns = ['no', 'name', 'permissions','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<User>;

  constructor(private management:ManagementSystemService,private share:SharedDataService) { 
   this.management.getRoles().subscribe(res=>{
      this.dataSource = new MatTableDataSource(res.Value);
    })
  }
  
  ngOnInit(): void {
  }

  openDeleteDialog(){
    this.share.openDeleteDialog()
  }
 

}
