import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ModalConfirmationComponent } from "src/app/shared/components/modal-confirmation/modal-confirmation.component";
import { ModalFormComponent } from "src/app/shared/components/modal-form/modal-form.component";

export interface user {
    type: string;
    name: string;
    job: string;
}

@Component({
    selector: "app-cud-methods",
    template: `
        <section class="card text-center">
            <div class="card-body">
                <button mat-button (click)="openDialog({ type: 'add' })">
                    <mat-icon>add_circle</mat-icon> Add User
                </button>

                <button mat-button class="mx-2" (click)="openDialog(user)">
                    <mat-icon>create</mat-icon> Update User
                </button>

                <button mat-button class="mx-2" (click)="openDeleteDialog()">
                    <mat-icon class="text-danger">delete_sweep</mat-icon> Delete
                    User
                </button>
            </div>
        </section>
    `,
    styles:[`.card{box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 
      0 2px 2px 0 rgba(0, 0, 0, 0.14),0 1px 5px 0 rgba(0, 0, 0, 0.12);}`]
  
})
export class CudMethodsComponent implements OnInit {
    user: user = { type: "update", name: "ahmed", job: "developer" };

    constructor(public dialog: MatDialog, private toaster: ToastrService) {}

    openDialog(data) {
        const dialogRef = this.dialog.open(ModalFormComponent, {
            height: "300px",
            width: "600px",
            data,
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }

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
                this.toaster.success("User deleted successfully", "Great");
            }
        });
    }

    ngOnInit(): void {}
}
