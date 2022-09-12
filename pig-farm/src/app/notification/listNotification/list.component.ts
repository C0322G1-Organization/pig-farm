import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../service/notification.service';
import {Notifications} from '../model/notification';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  notifications: Notifications[];

  constructor(private notificationService: NotificationService){ }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.notificationService.findAll().subscribe(notifications => {
      this.notifications = notifications;
      console.log(notifications);
    });
  }

}
