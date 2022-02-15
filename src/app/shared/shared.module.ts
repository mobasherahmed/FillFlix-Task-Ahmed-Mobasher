import { NgModule } from "@angular/core";
import { MatTableComponent } from "./components/mat-table/mat-table.component";
import { MaterialModule } from "./modules/material/material.module";
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ModalConfirmationComponent } from './components/modal-confirmation/modal-confirmation.component';

@NgModule({

    declarations:[MatTableComponent, ModalFormComponent, ModalConfirmationComponent],
    imports:[MaterialModule,ReactiveFormsModule,FormsModule,CommonModule],
    exports:[MatTableComponent]
})

export class SharedModule {}