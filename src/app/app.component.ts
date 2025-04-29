import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite'
import { UserInfoService } from './core/services/user-info.service';

@Component({
  selector: 'hw-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private userInfoService: UserInfoService) { }
  ngOnInit(): void {
    initFlowbite();
    this.userInfoService.loadUser();
  }

}
