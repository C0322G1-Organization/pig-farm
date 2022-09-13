import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../notification.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Notification} from '../../model/notification';
import {ToastrService} from 'ngx-toastr';
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
<<<<<<< HEAD
  notifications: Notifications[] = [];
=======
  notifications: Notification[] = [];
>>>>>>> 8e075d5df1a3e22e604115b3ef4206de5ffdfb11
  nameDelete: any = [];
  ids: number[] = [];
  check: string[] = [];
  editId: string;
  title: any;
  checkNext: boolean;
  checkPrevious: boolean;
  searchForm = new FormGroup({
    content: new FormControl('')
  });

  constructor(private notificationService: NotificationService,
              private router: Router,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getNotifications(0, '');
  }

  getNotifications(page: number, content: string) {
    this.notificationService.getAllNotifications(page, content).subscribe((value: any) => {
      this.number = value?.number;
      this.notifications = value?.content;
      this.msg = '';
      this.checkNext = !value.last;
      this.checkPrevious = !value.first;
    }, error => {
      console.log(error);
    });
  }

  deleteId() {
    this.check = [];
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
    this.nameDelete = [];
  }

  checkDelete(value: any) {
    this.ids = [];
    this.msg = '';
    this.nameDelete = [];
    this.notifications.forEach(item => {
      if (value[item.id] === true) {
        this.ids.push(item.id);
        this.nameDelete.push(item.title);
      }
    });
    this.notificationService.getAllNotifications(0, '').subscribe(() => {
    });
  }

  checkButton(value: any) {
    console.log('vlaue' + value);
    this.msg = '';
    if (this.check.includes(value)) {
      this.check.filter(item => item !== value);
      for (let i = 0; i < this.check.length; i++) {
        if (this.check[i] === value) {
          this.check.splice(i, 1);
        }
      }
    } else {
      this.check.push(value);
    }
    if (this.check.length > 1) {
      this.editId = null;
    } else {
      this.editId = this.check[0];
    }
  }

  resetDelete() {
    this.nameDelete = [];
    this.ids = [];
  }

  goPrevious() {
    this.number--;
    this.getNotifications(this.number, this.content);
    this.check = [];
  }

  goNext() {
    this.number++;
    this.getNotifications(this.number, this.content);
    this.check = [];
  }

  search() {
    this.content = this.searchForm.value.content;
    this.getNotifications(0, this.content);
  }
}
