import { Component, OnInit } from '@angular/core';
import { HostingHttpService } from '../../../core/services/hosting-http.service';
import { IHostingPlan } from '../../../models/IHostingPlan';
import { LoadingService } from '../../../core/services/loading.service';
import { Messages } from '../../../texts/messages';
import { SettingComponent } from '../../../shared/svg-icons/setting/setting.component';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { LocationComponent } from '../../../shared/svg-icons/location/location.component';
import { MemoryComponent } from '../../../shared/svg-icons/memory/memory.component';
import { DatabaseComponent } from '../../../shared/svg-icons/database/database.component';
import { SpeedComponent } from '../../../shared/svg-icons/speed/speed.component';
import { RocketComponent } from '../../../shared/svg-icons/rocket/rocket.component';
import { EmailComponent } from '../../../shared/svg-icons/email/email.component';
import { LayersComponent } from '../../../shared/svg-icons/layers/layers.component';
import { WebComponent } from '../../../shared/svg-icons/web/web.component';
import { UpComponent } from '../../../shared/svg-icons/up/up.component';
import { DownComponent } from '../../../shared/svg-icons/down/down.component';


@Component({
  selector: 'hw-hosting-cards',
  templateUrl: './hosting-cards.component.html',
  styleUrl: './hosting-cards.component.css',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden',
      })),
      state('expanded', style({
        height: '*',
        opacity: 1,
        overflow: 'hidden',
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease')
      ]),
    ])
  ]
})
export class HostingCardsComponent implements OnInit {
  hostingPlans: IHostingPlan[] = [];
  isShowMoreExpanded: boolean = false;
  Messages = Messages;
  SettingComponent = SettingComponent;
  WebComponent = WebComponent;
  LocationComponent = LocationComponent
  MemoryComponent = MemoryComponent
  DatabaseComponent = DatabaseComponent
  SpeedComponent = SpeedComponent
  RocketComponent = RocketComponent
  EmailComponent = EmailComponent
  LayersComponent = LayersComponent
  UpComponent = UpComponent;
  DownComponent = DownComponent

  constructor(private hostingHttpService: HostingHttpService,
    private loadingService: LoadingService
  ) { }
  ngOnInit(): void {
    this.getHostingPlans();

  }

  toggleExpand() {
    this.isShowMoreExpanded = !this.isShowMoreExpanded;
  }

  getHostingPlans() {
    this.loadingService.show();
    this.hostingHttpService.getUserTransactions().subscribe({
      next: (date) => {
        this.hostingPlans = date;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }
}
