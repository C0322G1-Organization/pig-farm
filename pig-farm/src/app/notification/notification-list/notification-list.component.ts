import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NotificationService} from '../../service/notification.service';
import {Notifications} from '../../model/notification';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  msg: string;
  clss: string;
  content = '';
  number: number;
  notifications: Notifications[] = [];
  ids: number[] = [];
  title: any;
  checkNext: boolean;
  checkPrevious: boolean;
  searchForm = new FormGroup({
    content: new FormControl('')
  });
  deleteList: Notifications[] = [];

  constructor(private notificationService: NotificationService,
              private router: Router,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getNotifications(0, '');
  }

  getNotifications(page: number, content: string) {
    this.notificationService.getAllNotifications(page, content).subscribe((value: any) => {
      console.log(value);
      this.number = page;
      this.notifications = value?.content;
      this.msg = '';
      this.checkNext = !value.last;
      this.checkPrevious = !value.first;
    }, error => {
      console.log(error);
    });
  }

  deleteId() {
    if (this.ids.length > 0) {
      this.notificationService.deleteNotifications(this.ids).subscribe(value1 => {
        this.getNotifications(0, '');
        this.toast.error('Xóa thành công !!!', 'Thông báo');
        this.ids = [];
      }, err => {
        this.clss = 'rd';
        this.msg = 'Có sự cố khi xóa thông báo';
      });
    } else {
      this.clss = 'rd';
      this.msg = 'Bạn phải chọn thông báo mới thực hiện được chức năng này';
      this.toast.error('Bạn phải chọn mục để xóa !!!', 'Thông báo');
    }
    this.deleteList = [];
  }

  getListDelete(notificationDelete: Notifications) {
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === notificationDelete.id) {
        this.deleteList.splice(i, 1);
        return;
      }
    }
    this.deleteList.push(notificationDelete);
    this.ids = [];
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === this.ids[i]) {
        this.ids.splice(i, 1);
        return;
      }
    }
    for (const item of this.deleteList) {
      this.ids.push(item.id);
    }
  }

  checkbox(notificationDelete: Notifications) {
    for (const item of this.deleteList) {
      if (item.id === notificationDelete.id) {
        return true;
      }
    }
    return false;
  }

  resetDelete() {
    this.ids = [];
  }

  goPrevious() {
    this.number--;
    this.getNotifications(this.number, this.content);
  }

  goNext() {
    console.log(11111);
    this.number++;
    this.getNotifications(this.number, this.content);
  }

  search() {
    this.content = this.searchForm.value.content;
    this.getNotifications(0, this.content);
  }
}
