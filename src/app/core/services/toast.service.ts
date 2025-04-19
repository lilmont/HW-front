import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastr: ToastrService) { }

  private buildMessage(icon: string, title: string, message: string, toastHeaderColor: string): string {
    return `
      <div class="toast-body">
        <div class="toast-icon">${icon}</div>
        <div class="toast-content">
          <strong class="${toastHeaderColor}">${title}</strong><br>
          <p class="toast-text">${message}</p>
        </div>
      </div>
    `;
  }

  success(message: string, title = 'Success') {
    const icon = `<img src="images/success-toast.png" alt="Success" width="36" height="36"/>`;
    const toastHeaderColor = 'success-toastr-header';
    this.toastr.success(this.buildMessage(icon, title, message, toastHeaderColor));
  }

  error(message: string, title = 'Error') {
    const icon = `<img src="images/error-toast.png" alt="Error" width="36" height="36"/>`;
    const toastHeaderColor = 'error-toastr-header';
    this.toastr.error(this.buildMessage(icon, title, message, toastHeaderColor));
  }

  warning(message: string, title = 'Warning') {
    const icon = `<img src="images/warning-toast.png" alt="Warning" width="36" height="36"/>`;
    const toastHeaderColor = 'warning-toastr-header';
    this.toastr.warning(this.buildMessage(icon, title, message, toastHeaderColor));
  }

  info(message: string, title = 'Info') {
    const icon = `<img src="images/info-toast.png" alt="Info" width="36" height="36"/>`;
    const toastHeaderColor = 'info-toastr-header';
    this.toastr.info(this.buildMessage(icon, title, message, toastHeaderColor));
  }
}
