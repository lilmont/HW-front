import { Component, OnDestroy, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectHttpService } from '../../services/project-http.service';
import { IProjectCategory } from '../../models/IProjectCategory';
import { IPurchaseProjectRequest, PurchaseProjectRequest } from '../../models/IPurchaseProjectRequest';

@Component({
  selector: 'hw-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  isAddMode: boolean = true;
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  projectForm!: FormGroup;
  projectId?: number = undefined;
  projectCategoryList: IProjectCategory[] = []

  imagePreviewUrl?: string;

  purchasedCount: number = 0;
  totalPurchased: number = 0;
  userShareOfTotalPurchased: number = 0;

  purchaseProjectRequest: IPurchaseProjectRequest = new PurchaseProjectRequest();
  isPurchaseConfirmationModalOpen: boolean = false;

  constructor(private route: ActivatedRoute,
    private loadingService: LoadingService,
    private projectHttpService: ProjectHttpService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProjectCategories();

    this.projectForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      previewLink: ['', Validators.required],
      downloadLink: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      projectStatus: [0, Validators.required],
      isShown: [false],
      confirmDate: [null],
      dateCreated: [null],
      projectCategoryId: [null, Validators.required],
      userPercentage: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      userId: [null, Validators.required],
      userPhoneNumber: [null],

      projectImage: [''],
      projectImageFile: [null],
    });

    this.route.paramMap.subscribe(params => {
      this.projectId = Number(params.get('id'));
      this.isAddMode = !this.projectId;

      const imgFileCtrl = this.projectForm.get('projectImageFile');

      if (this.isAddMode) {
        imgFileCtrl?.setValidators(Validators.required);
      } else {
        imgFileCtrl?.clearValidators();
      }

      imgFileCtrl?.updateValueAndValidity();

      if (!this.isAddMode) {
        this.getProjectDetail(this.projectId);
      }
    });
  }

  getProjectCategories(): void {
    this.loadingService.show();
    this.projectHttpService.getProjectCategories().subscribe({
      next: (response) => {
        if (response.success)
          this.projectCategoryList = response.data;
        else
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);

        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  getProjectDetail(id: number): void {
    this.loadingService.show();
    this.projectHttpService.getProjectDetail(id).subscribe({
      next: (response) => {
        if (response.success) {
          const project = response.data;
          // Populate simple fields
          this.projectForm.patchValue({
            id: project.id,
            title: project.title,
            description: project.description,
            price: project.price,
            previewLink: project.previewLink,
            downloadLink: project.downloadLink,
            projectImage: project.projectImage,
            projectStatus: project.projectStatus,
            isShown: project.isShown,
            projectCategoryId: project.projectCategoryId,
            dateCreated: project.dateCreated,
            confirmDate: project.confirmDate,
            userPercentage: project.userPercentage,
            userId: project.userId,
            userPhoneNumber: project.userPhoneNumber
          });

          this.purchasedCount = project.purchasedCount;
          this.totalPurchased = project.totalPurchased;
          this.userShareOfTotalPurchased = project.userShareOfTotalPurchased;
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

  get projectImageUrl(): string {
    return this.imagePreviewUrl
      ? this.imagePreviewUrl
      : `${this.baseUrl}/uploads/projects/images/${this.projectForm.get('projectImage')?.value}`;
  }

  onProjectImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.imagePreviewUrl = undefined;
      this.projectForm.get('projectImageFile')?.setValue(null);
      return;
    }

    const file = input.files[0];

    // Clean previous preview
    if (this.imagePreviewUrl) {
      URL.revokeObjectURL(this.imagePreviewUrl);
    }

    // Create preview URL
    this.imagePreviewUrl = URL.createObjectURL(file);
    this.projectForm.get('projectImageFile')?.setValue(file);
  }

  ngOnDestroy(): void {
    if (this.imagePreviewUrl) {
      URL.revokeObjectURL(this.imagePreviewUrl);
    }
  }

  AddOrEditProject(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const formValues = this.projectForm.value;
    const formData = new FormData();

    formData.append('Id', formValues.id ?? '');
    formData.append('Title', formValues.title);
    formData.append('Description', formValues.description);
    formData.append('previewLink', formValues.previewLink);
    formData.append('downloadLink', formValues.downloadLink);
    formData.append('Price', formValues.price.toString().replace(/,/g, ''));
    formData.append('projectStatus', formValues.projectStatus.toString());
    formData.append('isShown', formValues.isShown);
    formData.append('userPercentage', formValues.userPercentage.toString());
    formData.append('userId', formValues.userId.toString());
    formData.append('projectCategoryId', formValues.projectCategoryId.toString());

    // File uploads
    if (this.projectForm.get('projectImageFile')) {
      formData.append('projectImageFile', this.projectForm.get('projectImageFile')?.value);
    }

    this.loadingService.show();

    const apiCall = this.isAddMode
      ? this.projectHttpService.addProject(formData)
      : this.projectHttpService.editProject(formData);

    apiCall.subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(this.isAddMode ? Messages.Success.projectAddedSuccessfully : Messages.Success.projectEditedSuccessfully, '');
          if (this.isAddMode)
            this.router.navigate(['/mazmon/projects']);
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

  openPurchaseConfirmationModal(): void {
    this.isPurchaseConfirmationModalOpen = true;
  }

  closePurchaseConfirmationModal(): void {
    this.isPurchaseConfirmationModalOpen = false;
  }

  purchaseProject(): void {
    if (this.projectId)
      this.purchaseProjectRequest.projectId = this.projectId;


    this.loadingService.show();
    this.projectHttpService.purchaseCourse(this.purchaseProjectRequest).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(Messages.Success.purchaseProjectSuccessful, '');
          location.reload();
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }
        this.closePurchaseConfirmationModal();
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
        this.closePurchaseConfirmationModal();
      }
    });
  }
}
