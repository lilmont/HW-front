import { Component, Input } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { IUserCourseCard } from '../../../models/IUserCourseCard';
import { LoadingService } from '../../../core/services/loading.service';
import { CourseHttpService } from '../../services/course-http.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'hw-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrl: './user-courses.component.css'
})
export class UserCoursesComponent {
  Messages = Messages;
  courseCards: IUserCourseCard[] = [];
  @Input() userId: number | undefined = undefined;
  constructor(private loadingService: LoadingService,
    private courseHttpService: CourseHttpService,
    private toastr: ToastService) { }

  ngOnInit(): void {
    if (this.userId)
      this.getUserCourses(this.userId);
  }

  getUserCourses(userId: number) {
    this.loadingService.show();
    this.courseHttpService.getUserCourses(userId).subscribe({
      next: (response) => {
        if (response.success) {
          this.courseCards = response.data;
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
}
