import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: unknown): void {
    const toastr = this.injector.get(ToastrService);
    toastr.error('An unexpected error occurred.', 'Error');
    console.error('Global error:', error);
  }
}
