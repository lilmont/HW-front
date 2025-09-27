import { Component, Input } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { HostingHttpService } from '../../../core/services/hosting-http.service';
import { BehaviorSubject } from 'rxjs';
import { SubmitDomainInfo } from '../../../models/ISubmitDomainInfo';
import { IPasswordRecovery, PasswordRecovery } from '../../../models/IPasswordRecovery';

@Component({
  selector: 'hw-submit-domain-modal',
  templateUrl: './submit-domain-modal.component.html',
  styleUrl: './submit-domain-modal.component.css'
})
export class SubmitDomainModalComponent {
  Messages = Messages;
  isModalOpen: boolean = false;
  submitDomainInfo: SubmitDomainInfo = new SubmitDomainInfo();
  domainInvalid: boolean = false;
  showWaitingMessage: boolean = false;
  @Input() userHostId: number = 0;

  private _buttonLoading = new BehaviorSubject<boolean>(false);
  readonly buttonLoading$ = this._buttonLoading.asObservable();

  showPasswordModal: boolean = false;
  loginInfo: IPasswordRecovery = new PasswordRecovery();

  constructor(
    private hostingHttpService: HostingHttpService) { }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.submitDomainInfo = new SubmitDomainInfo();
  }

  submitDomain() {
    this.domainInvalid = !this.isDomainValid();

    if (this.domainInvalid || this.domainInvalid) {
      return;
    }

    this.submitDomainInfo.productId = this.userHostId;

    this._buttonLoading.next(true);
    this.showWaitingMessage = true;
    this.hostingHttpService.submitDomain(this.submitDomainInfo).subscribe({
      next: (data) => {
        this._buttonLoading.next(false);
        this.loginInfo = data;
        this.showWaitingMessage = false;
        this.closeModal();
        this.showPasswordModal = true;
      },
      error: () => {
        this.showWaitingMessage = false;
        this._buttonLoading.next(false);
      }
    });
  }

  isDomainValid(): boolean {
    if (!this.submitDomainInfo.domain) return false;

    this.submitDomainInfo.domain = this.submitDomainInfo.domain.trim().toLowerCase();

    // Reject if starts with forbidden prefixes
    const forbiddenPrefixes = ['http://', 'https://', 'www.', 'http', 'https'];
    if (forbiddenPrefixes.some(p => this.submitDomainInfo.domain.startsWith(p))) return false;

    // No spaces
    if (/\s/.test(this.submitDomainInfo.domain)) return false;

    // No double dots
    if (this.submitDomainInfo.domain.includes('..')) return false;

    // Remove trailing dot if any (optional)
    if (this.submitDomainInfo.domain.endsWith('.')) this.submitDomainInfo.domain = this.submitDomainInfo.domain.slice(0, -1);

    // Must contain at least one dot
    if (!this.submitDomainInfo.domain.includes('.')) return false;

    // Valid characters only
    if (!/^[a-z0-9.-]+$/.test(this.submitDomainInfo.domain)) return false;

    // Split labels and check each
    const labels = this.submitDomainInfo.domain.split('.');

    if (labels.length !== 2) return false;

    if (labels.some(label => label.length < 1 || label.length > 63)) return false;

    // Labels cannot start or end with '-'
    if (labels.some(label => label.startsWith('-') || label.endsWith('-'))) return false;

    // TLD check - last label at least 2 chars, all letters
    const tld = labels[labels.length - 1];
    if (!/^[a-z]{2,}$/.test(tld)) return false;

    // Domain total length max 253
    if (this.submitDomainInfo.domain.length > 253) return false;

    return true;
  }

  onPasswordModalClose(): void {
    this.showPasswordModal = false;
    this.loginInfo = new PasswordRecovery();
  }
}
