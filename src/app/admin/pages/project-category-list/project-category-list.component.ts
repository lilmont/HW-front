import { Component } from '@angular/core';
import { CommonHttpService } from '../../services/common-http.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ProjectCategoryQueryParameters } from '../../models/IProjectCategoryQueryParameters';
import { IProjectCategoryListItem, ProjectCategoryListItem } from '../../models/IProjectCategoryListItem';
import { Messages } from '../../../texts/messages';
import { ToastService } from '../../../core/services/toast.service';

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
  titleInvalid: boolean = false;
  constructor(private commonHttpService: CommonHttpService,
    private toastr: ToastService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadProjectCategories();
  }

  loadProjectCategories() {
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
    this.loadProjectCategories();
  }

  openAddOrEditModal(category: IProjectCategoryListItem | undefined) {
    if (!category)
      this.selectedProjectCategory = new ProjectCategoryListItem();
    else
      this.selectedProjectCategory = category;
    this.isAddOrEditModalOpen = true;
  }
  closeAddOrEditModal() {
    this.selectedProjectCategory = undefined;
    this.titleInvalid = false;
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

  addOrEditCategory() {
    if (!this.selectedProjectCategory)
      return;

    if (this.selectedProjectCategory.title.trim() === '') {
      this.titleInvalid = true;
      return;
    }

    const apiCall = !this.selectedProjectCategory?.id
      ? this.commonHttpService.addProjectCategory(this.selectedProjectCategory)
      : this.commonHttpService.editProjectCategory(this.selectedProjectCategory);

    apiCall.subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(!this.selectedProjectCategory?.id ? Messages.Success.categoryAddedSuccessfully : Messages.Success.categoryEditedSuccessfully, '');
          location.reload();
        } else {
          this.toastr.error(response.data ?? Messages.Errors.invalidRequest, Messages.Errors.error)
        }
        this.closeAddOrEditModal();
        this.loadingService.hide();
      },
      error: () => {
        this.closeAddOrEditModal();
        this.loadingService.hide();
      },
    });
  }
}
