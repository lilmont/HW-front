import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../../core/services/loading.service';
import { ISupportVideoListItem } from '../../models/ISupportVideoListItem';
import { SupportVideoQueryParameters } from '../../models/ISupportVideoQueryParameters';
import { CommonHttpService } from '../../services/common-http.service';

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
}
