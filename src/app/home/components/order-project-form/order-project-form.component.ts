import { Component } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { environment } from '../../../../environments/environment';
import { IOrderFormMessage, OrderFormMessage } from '../../../models/IOrderFormMessage';
import { MessagingHttpService } from '../../../core/services/messaging-http.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'hw-order-project-form',
  templateUrl: './order-project-form.component.html',
  styleUrl: './order-project-form.component.css'
})
export class OrderProjectFormComponent {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  message: IOrderFormMessage = new OrderFormMessage();
  fullNameInvalid: boolean = false;
  phoneNumberInvalid: boolean = false;
  messageTextInvalid: boolean = false;

  constructor(private messagingHttpService: MessagingHttpService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) {
  }

  submitMessage(): void {
    this.message.fullName = this.sanitizeInput(this.message.fullName);
    this.message.phoneNumber = this.sanitizeInput(this.message.phoneNumber);
    this.message.messageText = this.sanitizeInput(this.message.messageText);

    if (!this.validateOrderFormMessage(this.message))
      return;

    this.loadingService.show();
    this.messagingHttpService.addMessage(this.message).subscribe({
      next: (response) => {
        this.loadingService.hide();

        if (response.isSuccess) {
          this.toastr.success(Messages.Success.saveUserInfoSuccessful, '');
          this.resetForm();
        } else {
          response.errors.forEach(err => {
            switch (err.field.toLowerCase()) {
              case 'fullname':
                this.fullNameInvalid = true;
                break;
              case 'phonenumber':
                this.phoneNumberInvalid = true;
                break;
              case 'messagetext':
                this.messageTextInvalid = true;
                break;
            }
            this.toastr.error(err.message, 'Validation Error');
          });
        }
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  sanitizeInput(input: string): string {
    if (!input) return input;

    // Trim leading and trailing spaces
    let sanitized = input.trim();

    // Remove HTML tags
    sanitized = sanitized.replace(/<[^>]*>/g, '');

    // Replace multiple spaces with a single space
    sanitized = sanitized.replace(/\s{2,}/g, ' ');

    // Remove emojis (optional)
    sanitized = sanitized.replace(/[\u{1F600}-\u{1F64F}]/gu, '');

    return sanitized;
  }

  validateOrderFormMessage(message: IOrderFormMessage): boolean {
    if (!message.fullName || message.fullName.trim() === '') {
      this.fullNameInvalid = true;
      return false;
    }

    if (!message.phoneNumber || message.phoneNumber.trim() === '') {
      this.phoneNumberInvalid = true;
      return false;
    } else if (!/^[0-9+\-() ]{7,20}$/.test(message.phoneNumber)) {
      this.phoneNumberInvalid = true;
      return false;
    }

    if (!message.messageText || message.messageText.trim() === '' || message.messageText.trim().length < 40 || message.messageText.trim().length > 500) {
      this.messageTextInvalid = true;
      return false;
    }

    return true;
  }

  resetForm(): void {
    this.message = new OrderFormMessage();
    this.fullNameInvalid = false;
    this.phoneNumberInvalid = false;
    this.messageTextInvalid = false;
  }
}
