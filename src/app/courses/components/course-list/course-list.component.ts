import { Component } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { ICourseCardInfo } from '../../../models/ICourseCardInfo';
import { CourseHttpService } from '../../../core/services/course-http.service';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'hw-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
  Messages = Messages;
  courses: ICourseCardInfo[] = [];

  constructor(private courseHttpService: CourseHttpService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.loadingService.show();
    this.courseHttpService.getAllCourses().subscribe({
      next: (response) => {
        this.courses = response;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }
}
