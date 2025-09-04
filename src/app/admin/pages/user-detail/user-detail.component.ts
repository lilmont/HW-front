import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hw-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  Messages = Messages
  activeTab: 'general' | 'transaction' | 'hosting' | 'course' = 'general';
  userId: number | undefined = undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
    });
  }
}
