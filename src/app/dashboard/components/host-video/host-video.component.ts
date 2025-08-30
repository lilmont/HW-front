import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { environment } from '../../../../environments/environment';
import { CourseHttpService } from '../../../core/services/course-http.service';

@Component({
  selector: 'hw-host-video',
  templateUrl: './host-video.component.html',
  styleUrl: './host-video.component.css'
})
export class HostVideoComponent implements OnInit {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  constructor(private courseHttpService: CourseHttpService) { }

  ngOnInit(): void {
    this.courseHttpService.openHostVideo().subscribe();
  }
}
