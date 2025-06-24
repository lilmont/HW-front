import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { environment } from '../../../../environments/environment';
import { SupportHttpService } from '../../../core/services/support-http.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ISupportVideo } from '../../../models/ISupportVideo';

@Component({
  selector: 'hw-support-videos',
  templateUrl: './support-videos.component.html',
  styleUrl: './support-videos.component.css'
})
export class SupportVideosComponent implements OnInit {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  isVideoModalOpen = false;
  selectedVideoUrl: string = '';
  selectedVideoTitle: string = '';
  videoList: ISupportVideo[] = []

  constructor(private supportHttpService: SupportHttpService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(): void {
    this.loadingService.show();
    this.supportHttpService.getAllSupportVideos().subscribe({
      next: (data) => {
        this.videoList = data;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  openVideoModal(title: string, videoUrl: string): void {
    this.selectedVideoTitle = title;
    this.selectedVideoUrl = videoUrl;
    this.isVideoModalOpen = true;
  }

  closeVideoModal(): void {
    this.isVideoModalOpen = false;
  }
}
