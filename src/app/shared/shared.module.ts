import { NgModule } from "@angular/core";
import { MatTableComponent } from "./components/mat-table/mat-table.component";
import { MaterialModule } from "./modules/material/material.module";
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ModalConfirmationComponent } from './components/modal-confirmation/modal-confirmation.component';
import { FooterComponent } from "./components/footer/footer.component";
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { FeatherIconsComponent } from "./components/feather-icons/feather-icons.component";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";

@NgModule({

    declarations:[MatTableComponent, ModalFormComponent, ModalConfirmationComponent,FooterComponent,BreadcrumbComponent,FeatherIconsComponent],
    imports:[MaterialModule,ReactiveFormsModule,FormsModule,CommonModule,TranslateModule,RouterModule],
    exports:[MatTableComponent, ModalFormComponent, ModalConfirmationComponent,FooterComponent,BreadcrumbComponent,FeatherIconsComponent]
})

export class SharedModule {}