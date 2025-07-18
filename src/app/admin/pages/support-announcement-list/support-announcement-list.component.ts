import { Component, OnInit } from '@angular/core';
import { ISupportAnnouncementListItem, SupportAnnouncementListItem } from '../../models/ISupportAnnouncementListItem';
import { Messages } from '../../../texts/messages';
import { CommonHttpService } from '../../services/common-http.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'hw-support-announcement-list',
  templateUrl: './support-announcement-list.component.html',
  styleUrl: './support-announcement-list.component.css'
})
export class SupportAnnouncementListComponent implements OnInit {
  Messages = Messages;
  announcements: ISupportAnnouncementListItem[] = [];
  isDeleteConfirmationModalOpen: boolean = false;
  isAddOrEditModalOpen: boolean = false;
  selectedAnnouncement?: ISupportAnnouncementListItem;
  modalAnnouncement: SupportAnnouncementListItem = new SupportAnnouncementListItem();
  textInvalid: boolean = false;

  constructor(private commonHttpService: CommonHttpService,
    private toastr: ToastService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.loadingService.show();
    this.commonHttpService.getSupportAnnouncements().subscribe({
      next: (response) => {
        if (response.success) {
          this.announcements = response.data;
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

  openAddOrEditModal(announcement: ISupportAnnouncementListItem | undefined) {
    this.selectedAnnouncement = announcement;
    if (announcement) {
      this.modalAnnouncement.text = announcement.text;
      this.modalAnnouncement.id = announcement?.id;
    }
    this.isAddOrEditModalOpen = true;
  }
  closeAddOrEditModal() {
    this.selectedAnnouncement = undefined;
    this.modalAnnouncement.reset();
    this.isAddOrEditModalOpen = false;
  }

  openDeleteConfirmationModal(announcement: ISupportAnnouncementListItem) {
    this.selectedAnnouncement = announcement;
    this.isDeleteConfirmationModalOpen = true;
  }
  closeDeleteConfirmationModal() {
    this.selectedAnnouncement = undefined;
    this.isDeleteConfirmationModalOpen = false;
  }

  deleteAnnouncement() {
    if (!this.selectedAnnouncement)
      return;

    this.loadingService.show();
    this.commonHttpService.deleteSupportAnnouncement(this.selectedAnnouncement).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(Messages.Success.announcementDeletedSuccessfully, '');
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

  addOrEditAnnouncement() {
    if (this.selectedAnnouncement?.text.trim() === '') {
      this.textInvalid = true;
      return;
    }

    const isAddMode = !this.selectedAnnouncement ? true : false;

    const apiCall = isAddMode
      ? this.commonHttpService.addSupportAnnouncement(this.modalAnnouncement)
      : this.commonHttpService.editSupportAnnouncement(this.modalAnnouncement);

    apiCall.subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(!this.selectedAnnouncement ? Messages.Success.supportAnnouncementAddedSuccessfully : Messages.Success.supportAnnouncementEditedSuccessfully, '');
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
