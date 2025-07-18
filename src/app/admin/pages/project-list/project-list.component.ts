import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { IProjectListItem } from '../../models/IProjectListItem';
import { ProjectQueryParameters } from '../../models/IProjectQueryParameters';
import { LoadingService } from '../../../core/services/loading.service';
import { ProjectHttpService } from '../../services/project-http.service';
import { IPurchaseProjectRequest, PurchaseProjectRequest } from '../../models/IPurchaseProjectRequest';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'hw-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {
  Messages = Messages;
  projects: IProjectListItem[] = [];
  totalCount = 0;

  filters: ProjectQueryParameters = new ProjectQueryParameters();

  purchaseProjectRequest: IPurchaseProjectRequest = new PurchaseProjectRequest();
  isPurchaseConfirmationModalOpen: boolean = false;

  constructor(private projectHttpService: ProjectHttpService,
    private toastr: ToastService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.loadingService.show();
    this.projectHttpService.getPagedProjects(this.filters).subscribe({
      next: (response) => {
        if (response.success) {
          this.projects = response.data.items;
          this.totalCount = response.data.totalCount;
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error)
        }
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });

  }

  onPageChange(page: any) {
    this.filters.pageNumber = page;
    this.loadProjects();
  }

  resetFilters() {
    this.filters.reset();
    this.loadProjects();
  }

  openPurchaseConfirmationModal(id: number): void {
    this.purchaseProjectRequest.projectId = id;
    this.isPurchaseConfirmationModalOpen = true;
  }

  closePurchaseConfirmationModal(): void {
    this.isPurchaseConfirmationModalOpen = false;
  }

  purchaseProject(): void {
    this.loadingService.show();
    this.projectHttpService.purchaseCourse(this.purchaseProjectRequest).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(Messages.Success.purchaseProjectSuccessful, '');
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
