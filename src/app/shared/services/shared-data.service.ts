import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ManagementSystemService } from 'src/app/management-system/services/management-system.service';
import { ModalConfirmationComponent } from '../components/modal-confirmation/modal-confirmation.component';
import { buttonsGuard } from '../interfaces/buttons-guard-interface';
import { dropdownSettings } from '../interfaces/multi-selection-interfaces';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  updateItem:BehaviorSubject<any> = new BehaviorSubject({})
	urls:BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	buttons:BehaviorSubject<any> = new BehaviorSubject<any>([]);
	token:BehaviorSubject<any> = new BehaviorSubject<any>('');
	showLoader:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public dropdownSettings:dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 10,
    allowSearchFilter: true
  };
  constructor(public dialog: MatDialog, private toaster: ToastrService) { }

  openDeleteDialog() {
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
        }
    });
  }

getBtnGuard(Screen:string,Btn:string){
  let btnGuard:buttonsGuard = this.buttons.getValue();
   return btnGuard[Screen][Btn];
}

}
