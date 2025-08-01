import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { CourseHttpService } from '../../../core/services/course-http.service';
import { ICourseCardInfo } from '../../../models/ICourseCardInfo';
import { LoadingService } from '../../../core/services/loading.service';
import { UserHttpService } from '../../../core/services/user-http.service';
import { IUserCommentList } from '../../../models/IUserCommentList';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'hw-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  title = 'hardworker-front';
  Messages = Messages;
  testimonials: IUserCommentList[] = [];
  courses: ICourseCardInfo[] = [];
  showModal: boolean = false;
  baseUrl = environment.apiBaseUrl;

  constructor(private courseHttpService: CourseHttpService,
    private loadingService: LoadingService,
    private userHttpService: UserHttpService
  ) { }

  ngOnInit(): void {
    const hasSeenModal = localStorage.getItem('signupModalSeen');
    console.log(localStorage.getItem('signupModalSeen'))
    if (!hasSeenModal) {
      console.log("hello")
      this.showIntroModal();
      localStorage.setItem('signupModalSeen', 'true');
    }

    this.getCourses();
    this.getComments();
  }

  getCourses(): void {
    this.loadingService.show();
    this.courseHttpService.getRecentCourses(4).subscribe({
      next: (response) => {
        this.courses = response;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  getComments(): void {
    this.loadingService.show();
    this.userHttpService.getApprovedUserComments(5).subscribe({
      next: (response) => {
        this.testimonials = response;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  showIntroModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
