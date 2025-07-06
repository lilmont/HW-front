import { ChangeDetectorRef, Component } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../core/services/loading.service';
import { HostHttpService } from '../../services/host-http.service';
import { ToastrService } from 'ngx-toastr';
import { IHostingDetail } from '../../models/IHostingDetail';

@Component({
  selector: 'hw-host-detail',
  templateUrl: './host-detail.component.html',
  styleUrl: './host-detail.component.css'
})
export class HostDetailComponent {
  isAddMode: boolean = true;
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  hostingPlanForm!: FormGroup;
  hostingPlanId?: number = undefined;

  constructor(private route: ActivatedRoute,
    private loadingService: LoadingService,
    private hostHttpService: HostHttpService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.hostingPlanForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      pleskPlanTitle: ['', Validators.required],
      controlPanelTitle: ['', Validators.required],
      serverLocation: ['', Validators.required],
      storage: ['', Validators.required],
      databaseNumber: ['', Validators.required],
      subdomainNumber: ['', Validators.required],
      domainNumber: ['', Validators.required],
      emailLimit: ['', Validators.required],
      supportedTechnologies: ['', Validators.required],
      bandwidth: ['', Validators.required],
      subscriptionDurationInMonths: [1, [Validators.required, Validators.min(1)]],
      isInstallmentAvailable: [false, Validators.required],
      dateCreated: [null],
    });

    this.route.paramMap.subscribe(params => {
      this.hostingPlanId = Number(params.get('id'));
      this.isAddMode = !this.hostingPlanId;

      if (!this.isAddMode) {
        this.getHostingPlanDetail(this.hostingPlanId);
      }
    });
  }

  getHostingPlanDetail(id: number): void {
    this.loadingService.show();
    this.hostHttpService.getHostingPlanDetail(id).subscribe({
      next: (response) => {
        if (response.success) {
          const hostingPlan = response.data;

          this.hostingPlanForm.patchValue({
            id: hostingPlan.id,
            title: hostingPlan.title,
            description: hostingPlan.description,
            price: hostingPlan.price,
            pleskPlanTitle: hostingPlan.pleskPlanTitle,
            controlPanelTitle: hostingPlan.controlPanelTitle,
            serverLocation: hostingPlan.serverLocation,
            storage: hostingPlan.storage,
            databaseNumber: hostingPlan.databaseNumber,
            subdomainNumber: hostingPlan.subdomainNumber,
            domainNumber: hostingPlan.domainNumber,
            emailLimit: hostingPlan.emailLimit,
            supportedTechnologies: hostingPlan.supportedTechnologies,
            bandwidth: hostingPlan.bandwidth,
            subscriptionDurationInMonths: hostingPlan.subscriptionDurationInMonths,
            isInstallmentAvailable: hostingPlan.isInstallmentAvailable,
            dateCreated: hostingPlan.dateCreated,
          });

        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  AddOrEditHostingPlan(): void {
    if (this.hostingPlanForm.invalid) {
      this.hostingPlanForm.markAllAsTouched();
      return;
    }

    const formValues = this.hostingPlanForm.value;

    const payload: IHostingDetail = {
      id: formValues.id ?? null,
      title: formValues.title,
      description: formValues.description,
      price: +formValues.price.toString().replace(/,/g, ''),
      pleskPlanTitle: formValues.pleskPlanTitle,
      controlPanelTitle: formValues.controlPanelTitle,
      serverLocation: formValues.serverLocation,
      storage: formValues.storage,
      databaseNumber: formValues.databaseNumber,
      subdomainNumber: formValues.subdomainNumber,
      domainNumber: formValues.domainNumber,
      emailLimit: formValues.emailLimit,
      supportedTechnologies: formValues.supportedTechnologies,
      bandwidth: formValues.bandwidth,
      subscriptionDurationInMonths: +formValues.subscriptionDurationInMonths,
      isInstallmentAvailable: formValues.isInstallmentAvailable,
    };

    this.loadingService.show();

    const apiCall = this.isAddMode
      ? this.hostHttpService.addHostingPlan(payload)
      : this.hostHttpService.editHostingPlan(payload);

    apiCall.subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(this.isAddMode ? Messages.Success.hostingPlanAddedSuccessfully : Messages.Success.hostingPlanEditedSuccessfully, '');
          if (this.isAddMode)
            this.router.navigate(['/mazmon/hosting']);
          else
            location.reload();
        } else {
          this.toastr.error(response.data ?? Messages.Errors.invalidRequest, Messages.Errors.error)
        }
        this.loadingService.hide();
      },
      error: () => {

        this.loadingService.hide();
      },
    });
  }
}
