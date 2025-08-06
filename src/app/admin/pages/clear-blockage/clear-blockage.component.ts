import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { environment } from '../../../../environments/environment';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LoadingService } from '../../../core/services/loading.service';
import { CommonHttpService } from '../../services/common-http.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'hw-clear-blockage',
  templateUrl: './clear-blockage.component.html',
  styleUrl: './clear-blockage.component.css'
})
export class ClearBlockageComponent implements OnInit {
  Messages = Messages;
  clearingForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private loadingService: LoadingService,
    private commonHttpService: CommonHttpService,
    private toastr: ToastService
  ) { }

  ngOnInit(): void {
    this.clearingForm = this.fb.group({
      userId: [0],
      userPhoneNumber: ['']
    }, { validators: [this.requireUserIdOrPhone()] });
  }

  requireUserIdOrPhone(): (formGroup: AbstractControl) => ValidationErrors | null {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const userId = formGroup.get('userId')?.value;
      const userPhoneNumber = formGroup.get('userPhoneNumber')?.value;

      const hasUserId = userId && userId !== 0;
      const hasPhone = userPhoneNumber && userPhoneNumber.trim() !== '';

      if (!hasUserId && !hasPhone) {
        return { userIdOrPhoneRequired: true };
      }

      return null;
    };
  }

  clearCache() {
    if (this.clearingForm.invalid) {
      this.clearingForm.markAllAsTouched();
      return;
    }
  }
}
