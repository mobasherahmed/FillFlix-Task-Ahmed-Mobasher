import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  displayedColumns = ['no', 'name', 'email','phoneNumber','status'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  customers: any[]=[];
  constructor(private _customer:CustomerService,public share:SharedDataService) { 
    this.listCustomers();
  }

  ngOnInit(): void {

  }

  listCustomers(){
    this._customer.getAllCustomers().subscribe(res=>{
    this.customers = res.Value;
    this.dataSource = new MatTableDataSource(res.Value);
    this.dataSource.paginator = this.paginator;

   })
  }





}
