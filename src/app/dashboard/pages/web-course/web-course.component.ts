import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { CourseHttpService } from '../../../core/services/course-http.service';
import { ICourseSession } from '../../../models/ICourseSession';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'hw-web-course',
  templateUrl: './web-course.component.html',
  styleUrl: './web-course.component.css'
})
export class WebCourseComponent implements OnInit {
  Messages = Messages;
  sessions: ICourseSession[] = [];

  constructor(private courseHttpService: CourseHttpService,
    private loadingService: LoadingService,
  ) { }
  ngOnInit(): void {
    this.getWebCourseSessions();
  }

  getWebCourseSessions() {
    this.loadingService.show();
    this.courseHttpService.getWebCourseSessions().subscribe({
      next: (data) => {
        this.sessions = data;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  downloadSession(sessionId: number, event: MouseEvent) {
    event.preventDefault();
    this.loadingService.show();
    this.courseHttpService.getSessionDownloadLink(sessionId).subscribe({
      next: (data) => {
        const anchor = document.createElement('a');
        anchor.href = data;
        anchor.download = '';
        anchor.style.display = 'none';
        document.body.appendChild(anchor);
        anchor.click();
        setTimeout(() => {
          document.body.removeChild(anchor);
        }, 1000);
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }
}
