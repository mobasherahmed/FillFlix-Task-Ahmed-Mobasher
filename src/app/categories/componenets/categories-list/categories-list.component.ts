import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalConfirmationComponent } from 'src/app/shared/components/modal-confirmation/modal-confirmation.component';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  panelOpenState = false;
  categories: any;
  constructor(public share:SharedDataService,private _category:CategoryService,private router:Router,public dialog: MatDialog) { 
    this.listCategories()
  }

  ngOnInit(): void {
  }

  listCategories(){
    this._category.getCategories().subscribe(res=>{
      this.categories = res.Value;
    })
  }

  editCategory(item){
    this._category.categories.next(item);
    this.router.navigate(['/categories/CategoryForm'])
  }
  
  openDeleteDialog(categoryId:number){
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
        this._category.deleteCategory(categoryId).subscribe(res=>{
         this.categories = this.categories.filter(item=>item.id !== categoryId);
        })
      }
  });
  }
  
  
}
