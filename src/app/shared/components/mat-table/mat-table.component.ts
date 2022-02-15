import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../interfaces/user-interface';
import { FillflixService } from '../../services/fillflix.service';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss'],
})
export class MatTableComponent implements OnInit {

  displayedColumns = ['id','avatar', 'name', 'email'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<User>;

  constructor(private fillflix:FillflixService) { 
   this.fillflix.users.subscribe(users=>{
      this.dataSource = new MatTableDataSource(users);
    })
  }
  
  ngOnInit(): void {
  }

 

}
