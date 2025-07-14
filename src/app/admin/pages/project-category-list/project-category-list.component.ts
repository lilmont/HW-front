import { Component } from '@angular/core';
import { CommonHttpService } from '../../services/common-http.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../../core/services/loading.service';
import { ProjectCategoryQueryParameters } from '../../models/IProjectCategoryQueryParameters';
import { IProjectCategoryListItem } from '../../models/IProjectCategoryListItem';
import { Messages } from '../../../texts/messages';

@Component({
  selector: 'hw-project-category-list',
  templateUrl: './project-category-list.component.html',
  styleUrl: './project-category-list.component.css'
})
export class ProjectCategoryListComponent {
  Messages = Messages;
  categories: IProjectCategoryListItem[] = [];
  totalCount = 0;
  filters: ProjectCategoryQueryParameters = new ProjectCategoryQueryParameters();

  isDeleteConfirmationModalOpen: boolean = false;
  isAddOrEditModalOpen: boolean = false;
  selectedProjectCategory?: IProjectCategoryListItem;
  constructor(private commonHttpService: CommonHttpService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadHostingPlans();
  }

  loadHostingPlans() {
    this.loadingService.show();
    this.commonHttpService.getPagedProjectCategories(this.filters).subscribe({
      next: (response) => {
        if (response.success) {
          this.categories = response.data.items;
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
    this.loadHostingPlans();
  }

  openAddOrEditModal(category: IProjectCategoryListItem | undefined) {
    this.selectedProjectCategory = category;
    this.isAddOrEditModalOpen = true;
  }
  closeAddOrEditModal() {
    this.selectedProjectCategory = undefined;
    this.isAddOrEditModalOpen = false;
  }

  openDeleteConfirmationModal(category: IProjectCategoryListItem) {
    this.selectedProjectCategory = category;
    this.isDeleteConfirmationModalOpen = true;
  }
  closeDeleteConfirmationModal() {
    this.selectedProjectCategory = undefined;
    this.isDeleteConfirmationModalOpen = false;
  }

  deleteCategory() {
    if (!this.selectedProjectCategory)
      return;

    this.loadingService.show();
    this.commonHttpService.deleteProjectCategory(this.selectedProjectCategory).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(Messages.Success.categoryDeletedSuccessfully, '');
          location.reload();
        } else {
          this.toastr.error(response.data ?? Messages.Errors.invalidRequest, Messages.Errors.error)
        }
        this.closeDeleteConfirmationModal();
        this.loadingService.hide();
      },
      error: () => {
        this.closeDeleteConfirmationModal();
        this.loadingService.hide();
      },
    });
  }

  addOrEditCategory() { }
}
