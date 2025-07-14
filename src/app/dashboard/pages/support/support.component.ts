import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { ISupportAnnouncement } from '../../../models/ISupportAnnouncement';
import { SupportHttpService } from '../../../core/services/support-http.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'hw-support',
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent implements OnInit {
  Messages = Messages;
  announcements: ISupportAnnouncement[] = [];

  constructor(private supportHttpService: SupportHttpService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.loadingService.show();
    this.supportHttpService.getSupportAnnouncements().subscribe({
      next: (data) => {
        this.announcements = data;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }
}
