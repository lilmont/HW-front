import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  baseUrl = environment.apiBaseUrl;
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

  private buildMessageWithoutTitle(icon: string, message: string, toastHeaderColor: string): string {
    return `
      <div class="toast-body">
        <div class="toast-icon">${icon}</div>
        <div class="toast-content justify-center">
          <p class="toast-text">${message}</p>
        </div>
      </div>
    `;
  }

  success(message: string, title = 'Success') {
    const icon = `<img src="` + this.baseUrl + `/uploads/utilities/success-toast.png" alt="Success" width="36" height="36"/>`;
    const toastHeaderColor = 'success-toastr-header';
    if (title)
      this.toastr.success(this.buildMessage(icon, title, message, toastHeaderColor));
    else
      this.toastr.success(this.buildMessageWithoutTitle(icon, message, toastHeaderColor));
  }

  error(message: string, title = 'Error') {
    const icon = `<img src="` + this.baseUrl + `/uploads/utilities/error-toast.png" alt="Error" width="36" height="36"/>`;
    const toastHeaderColor = 'error-toastr-header';
    if (title)
      this.toastr.error(this.buildMessage(icon, title, message, toastHeaderColor));
    else
      this.toastr.error(this.buildMessageWithoutTitle(icon, message, toastHeaderColor));
  }

  warning(message: string, title = 'Warning') {
    const icon = `<img src="` + this.baseUrl + `/uploads/utilities/warning-toast.png" alt="Warning" width="36" height="36"/>`;
    const toastHeaderColor = 'warning-toastr-header';
    if (title)
      this.toastr.warning(this.buildMessage(icon, title, message, toastHeaderColor));
    else
      this.toastr.warning(this.buildMessageWithoutTitle(icon, message, toastHeaderColor));
  }

  info(message: string, title = 'Info') {
    const icon = `<img src="` + this.baseUrl + `/uploads/utilities/info-toast.png" alt="Info" width="36" height="36"/>`;
    const toastHeaderColor = 'info-toastr-header';
    if (title)
      this.toastr.info(this.buildMessage(icon, title, message, toastHeaderColor));
    else
      this.toastr.info(this.buildMessageWithoutTitle(icon, message, toastHeaderColor));
  }
}
