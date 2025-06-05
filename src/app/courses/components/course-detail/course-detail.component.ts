import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Messages } from '../../../texts/messages';
import { LoadingService } from '../../../core/services/loading.service';
import { CourseHttpService } from '../../../core/services/course-http.service';
import { ICourseDetail } from '../../../models/ICourseDetail';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'hw-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  courseId!: number;
  courseSlug!: string;
  courseDetail!: ICourseDetail;
  isVideoModalOpen = false;

  @ViewChild('videoPlayer') videoPlayer?: ElementRef<HTMLVideoElement>;

  constructor(private route: ActivatedRoute,
    private loadingService: LoadingService,
    private courseHttpService: CourseHttpService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseId = Number(params.get('id'));
      this.courseSlug = params.get('courseSlug') || '';
    });

    this.getCourseDetail(this.courseId);
  }

  getCourseDetail(id: number) {
    this.loadingService.show();
    this.courseHttpService.getCourseDetail(id).subscribe({
      next: (data) => {
        this.courseDetail = data;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  openVideoModal() {
    this.isVideoModalOpen = true;
  }

  closeVideoModal() {
    this.isVideoModalOpen = false;
    // pause video when modal closes
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.pause();
      this.videoPlayer.nativeElement.currentTime = 0;
    }
  }
}
