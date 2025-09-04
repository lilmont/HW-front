import { Component, Input, OnInit } from '@angular/core';
import { IUserHost } from '../../../models/IUserHost';
import { Messages } from '../../../texts/messages';

@Component({
  selector: 'hw-user-hosts',
  templateUrl: './user-hosts.component.html',
  styleUrl: './user-hosts.component.css'
})
export class UserHostsComponent {
  Messages = Messages;
  @Input() userHostList: IUserHost[] = [];
}
