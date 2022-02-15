import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FillflixService } from "../../services/fillflix.service";

@Component({
    selector: "app-modal-confirmation",
    templateUrl: "./modal-confirmation.component.html",
    styleUrls: ["./modal-confirmation.component.scss"],
})
export class ModalConfirmationComponent implements OnInit {
    message: string = "Are you sure?";
    confirmButtonText = "Yes";
    cancelButtonText = "Cancel";
    constructor(private fillflix:FillflixService,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<ModalConfirmationComponent>
    ) {
        if (data) {
            this.message = data.message || this.message;
            if (data.buttonText) {
                this.confirmButtonText =
                    data.buttonText.ok || this.confirmButtonText;
                this.cancelButtonText =
                    data.buttonText.cancel || this.cancelButtonText;
            }
        }
    }

    onConfirmClick(): void {
      this.fillflix.deleteUser().subscribe(res=>{
        this.dialogRef.close(true);
      },err=>{
        this.dialogRef.close(false);
      })
    }

    ngOnInit(): void {}
}
