import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../../core/services/loading.service';
import { ISupportVideoListItem } from '../../models/ISupportVideoListItem';
import { SupportVideoQueryParameters } from '../../models/ISupportVideoQueryParameters';
import { CommonHttpService } from '../../services/common-http.service';
import { DeleteConfirmationCode } from '../../models/IDeleteConfirmationCode';

@Component({
  selector: 'hw-support-video-list',
  templateUrl: './support-video-list.component.html',
  styleUrl: './support-video-list.component.css'
})
export class SupportVideoListComponent implements OnInit {
  Messages = Messages;
  supportVideos: ISupportVideoListItem[] = [];
  totalCount = 0;
  filters: SupportVideoQueryParameters = new SupportVideoQueryParameters();

  isDeleteConfirmationModalOpen: boolean = false;
  deleteConfirmationCode: DeleteConfirmationCode = new DeleteConfirmationCode();

  constructor(private commonHttpService: CommonHttpService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadSupportVideos();
  }

  loadSupportVideos() {
    this.loadingService.show();
    this.commonHttpService.getPagedSupportVideos(this.filters).subscribe({
      next: (response) => {
        if (response.success) {
          this.supportVideos = response.data.items;
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
    this.loadSupportVideos();
  }

  openDeleteConfirmationModal(id: number) {
    this.deleteConfirmationCode.id = id;
    this.isDeleteConfirmationModalOpen = true;
  }
  closeDeleteConfirmationModal() {
    this.deleteConfirmationCode.id = 0;
    this.isDeleteConfirmationModalOpen = false;
  }

  deleteVideo(): void {
    this.loadingService.show();

    this.commonHttpService.deleteVideo(this.deleteConfirmationCode).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(Messages.Success.videoDeletedSuccessfully, '');
          location.reload();
        } else {
          this.toastr.error(response.data ?? Messages.Errors.invalidRequest, Messages.Errors.error)
        }
        this.isDeleteConfirmationModalOpen = false;
        this.loadingService.hide();
      },
      error: () => {
        this.isDeleteConfirmationModalOpen = false;
        this.loadingService.hide();
      },
    });
  }
}
