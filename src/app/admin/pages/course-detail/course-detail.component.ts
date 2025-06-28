import { Component } from '@angular/core';
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

  constructor(private route: ActivatedRoute,
    private loadingService: LoadingService,
    private courseHttpService: CourseHttpService,
    private toastr: ToastrService
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


  AddOrEditCourse(): void { }
}
