import { Component, OnInit } from '@angular/core';
import { IUserCourseCard } from '../../../models/IUserCourseCard';
import { CourseHttpService } from '../../../core/services/course-http.service';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'hw-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrl: './user-courses.component.css'
})
export class UserCoursesComponent implements OnInit {
  courseCards: IUserCourseCard[] = [];
  constructor(private loadingService: LoadingService,
    private courseHttpService: CourseHttpService) { }

  ngOnInit(): void {
    this.loadingService.show();
    this.courseHttpService.getAllUserCourses().subscribe({
      next: (response) => {
        this.courseCards = response;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }
}
