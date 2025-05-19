import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { IPasswordRecovery, PasswordRecovery } from '../../../models/IPasswordRecovery';
import { ToastService } from '../../../core/services/toast.service';
import { RefreshUserHostsListService } from '../../../core/services/refresh-user-hosts-list.service';

@Component({
  selector: 'hw-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrl: './password-modal.component.css'
})
export class PasswordModalComponent {
  @Input() loginInfo: IPasswordRecovery = new PasswordRecovery();
  @Output() closed = new EventEmitter<void>();

  copied = false;

  Messages = Messages;

  constructor(private toastr: ToastService,
    private refreshUserHostsListService: RefreshUserHostsListService
  ) { }

  copyCredentials() {
    const textToCopy = `Url:${this.loginInfo.url}\nUsername:${this.loginInfo.login}\nPassword:${this.loginInfo.password}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    });
    this.toastr.success(Messages.Success.loginInfoCopied, '');
  }

  close() {
    this.closed.emit();
    this.refreshUserHostsListService.triggerRefreshHosts();
  }
}
