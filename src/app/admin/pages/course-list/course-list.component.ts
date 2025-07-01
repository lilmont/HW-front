import { Component, OnInit } from '@angular/core';
import { CourseQueryParameters } from '../../models/ICourseQueryParameters';
import { Messages } from '../../../texts/messages';
import { ICourseListItem } from '../../models/ICourseListItem';
import { CourseHttpService } from '../../services/course-http.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'hw-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  Messages = Messages;
  courses: ICourseListItem[] = [];
  totalCount = 0;
  filters: CourseQueryParameters = new CourseQueryParameters();

  constructor(private courseHttpService: CourseHttpService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.loadingService.show();
    this.courseHttpService.getPagedCourses(this.filters).subscribe({
      next: (response) => {
        if (response.success) {
          this.courses = response.data.items;
          this.totalCount = response.data.totalCount;
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


  onPageChange(page: any) {
    this.filters.pageNumber = page;
    this.loadCourses();
  }
}
