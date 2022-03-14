import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HandleApiResponseService {

  constructor(private toastrs: ToastrService) {}
    // Handling HTTP Errors using Toaster
    public handleError(err: HttpErrorResponse) {
      let errorMessage: string;
      if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;;
        this.toastrs.error(errorMessage);

      } else {
        // The backend returned an unsuccessful response code.
        errorMessage = `An error occurred: ${err.error.message}`;
        this.toastrs.error(err.error.message,err.error.error);
      }
    }

    public SuccessMsg(message) {
        this.toastrs.success(message);
    }
}
