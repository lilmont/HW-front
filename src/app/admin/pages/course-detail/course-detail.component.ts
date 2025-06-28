import { ChangeDetectorRef, Component } from '@angular/core';
import { CourseDetail, CourseSession, ICourseDetail } from '../../models/ICourseDetail';
import { Messages } from '../../../texts/messages';
import { environment } from '../../../../environments/environment';
import { CourseHttpService } from '../../services/course-http.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'hw-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent {
  isAddMode: boolean = true;
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  courseId?: number = undefined;
  courseDetail: ICourseDetail = new CourseDetail();

  selectedVideoFile?: File;
  videoPreviewUrl?: string;

  selectedCoverImageFile?: File;
  imageCoverPreviewUrl?: string;

  selectedImageFile?: File;
  imagePreviewUrl?: string;

  constructor(private route: ActivatedRoute,
    private loadingService: LoadingService,
    private courseHttpService: CourseHttpService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseId = Number(params.get('id'));
    });
    if (this.courseId) {
      this.isAddMode = false;
      this.getCourseDetail(this.courseId);
    }
  }

  getCourseDetail(id: number): void {
    this.loadingService.show();
    this.courseHttpService.getCourseDetail(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.courseDetail = response.data;
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error)
        }
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    })
  }

  addSession() {
    const newSession = new CourseSession({
      number: (this.courseDetail.sessions.length + 1),
      title: '',
      description: '',
      downloadLink: ''
    });
    this.courseDetail.sessions.push(newSession);
  }

  deleteSession(index: number) {
    this.courseDetail.sessions.splice(index, 1);
  }
  onCourseImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.imagePreviewUrl = undefined;
      return;
    }

    const file = input.files[0];

    this.selectedImageFile = file;

    // Clean previous preview
    if (this.imagePreviewUrl) {
      URL.revokeObjectURL(this.imagePreviewUrl);
    }

    // Create preview URL
    this.imagePreviewUrl = URL.createObjectURL(file);
  }
  onCourseCoverImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.imageCoverPreviewUrl = undefined;
      return;
    }

    const file = input.files[0];

    this.selectedCoverImageFile = file;

    // Clean previous preview
    if (this.imageCoverPreviewUrl) {
      URL.revokeObjectURL(this.imageCoverPreviewUrl);
    }

    // Create preview URL
    this.imageCoverPreviewUrl = URL.createObjectURL(file);
  }

  onVideoSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.videoPreviewUrl = undefined;
      return;
    }

    const file = input.files[0];
    console.log('File selected:', file.name);

    this.selectedVideoFile = file;

    // Revoke previous preview URL if it exists
    if (this.videoPreviewUrl) {
      URL.revokeObjectURL(this.videoPreviewUrl);
    }

    // Create a preview URL from the file
    this.videoPreviewUrl = URL.createObjectURL(file);

    console.log('Video preview URL set:', this.videoPreviewUrl);
    this.cdr.detectChanges();
  }

  // Cleanup object URL when component is destroyed
  ngOnDestroy(): void {
    if (this.videoPreviewUrl) {
      URL.revokeObjectURL(this.videoPreviewUrl);
    }
    if (this.imagePreviewUrl) {
      URL.revokeObjectURL(this.imagePreviewUrl);
    }
    if (this.imageCoverPreviewUrl) {
      URL.revokeObjectURL(this.imageCoverPreviewUrl);
    }
  }

  AddOrEditCourse(): void { }
}
