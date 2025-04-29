import { Component, Input, input } from '@angular/core';
import { Messages } from '../../../texts/messages';

@Component({
  selector: 'hw-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.css'
})
export class DashboardSidebarComponent {
  Messages = Messages;
  @Input() isOpen: boolean = false;
  selectedItemIndex: number | null = 0;

}
