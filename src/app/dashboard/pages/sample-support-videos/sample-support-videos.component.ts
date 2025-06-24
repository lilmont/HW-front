import { Component, ElementRef, ViewChild } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { ISupportVideo } from '../../../models/ISupportVideo';
import { environment } from '../../../../environments/environment';
import { SupportHttpService } from '../../../core/services/support-http.service';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'hw-sample-support-videos',
  templateUrl: './sample-support-videos.component.html',
  styleUrl: './sample-support-videos.component.css'
})
export class SampleSupportVideosComponent {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  isVideoModalOpen = false;
  selectedVideoUrl: string = '';
  videoList: ISupportVideo[] = [];

  @ViewChild('videoPlayer') videoPlayerRef!: ElementRef<HTMLVideoElement>;


  constructor(private supportHttpService: SupportHttpService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.getAllSampleSupportVideos();
  }

  getAllSampleSupportVideos(): void {
    this.loadingService.show();
    this.supportHttpService.getAllSampleVideos().subscribe({
      next: (data) => {
        this.videoList = data;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  openVideoModal(videoUrl: string): void {
    this.selectedVideoUrl = this.baseUrl + '/uploads/support/videos/' + videoUrl;
    this.isVideoModalOpen = true;

    setTimeout(() => {
      const videoEl = this.videoPlayerRef?.nativeElement;
      if (videoEl) {
        videoEl.load(); // Make sure video is reloaded with new source
        videoEl.addEventListener('contextmenu', e => e.preventDefault()); // optional: prevent right-click
      }
    }, 0);
  }

  closeVideoModal(): void {
    this.isVideoModalOpen = false;
  }
}
