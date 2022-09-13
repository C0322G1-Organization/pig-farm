import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NotificationService} from '../notification.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  msg: string;
  clss: string;
  abc: any;
  content: string;
  totalPages: number;
  number: number;
  countTotalPages: number[];
  notifications: Notification[] = [];
  searchForm = new FormGroup({
    content: new FormControl('')
  });
  nameDelete: any = [];
  ids: number[] = [];
  check: string[] = [];
  editId: string;


  constructor(private notificationService: NotificationService,
              private router: Router,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getNotifications(0);
  }

  getNotifications(page: number) {
    // @ts-ignore
    // tslint:disable-next-line:variable-name
    this.notificationService.getAllNotifications(page).subscribe((value: any) => {
      this.totalPages = value?.totalPages;
      this.countTotalPages = new Array(value?.totalPages);
      this.number = value?.number;
      this.notifications = value?.content;
      this.msg = '';
    }, error => {
      console.log(error);
    });
  }

  deleteId() {
    this.check = [];
    if (this.ids.length > 0) {
      this.notificationService.deleteNotifications(this.ids).subscribe(value1 => {
        this.getNotifications(0);
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
    for (const valueElement of this.notifications) {
      if (value[valueElement.id] === true) {
        this.ids.push(valueElement.id);
      }
    }
    // tslint:disable-next-line:no-shadowed-variable
    this.notificationService.getAllNotifications(0).subscribe((value: any) => {
      for (let i = 0; i < this.ids.length; i++) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < value?.content.length; j++) {
          if (this.ids.includes(this.ids[i]) && this.ids[i] === value?.content[j].id) {
            this.nameDelete.splice(i, 1);
            this.nameDelete.push(value?.content[j].content);
          }
        }
      }
    });
  }

  checkButton(value: any) {
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
    let numberPage: number = this.number;
    if (numberPage > 0) {
      numberPage--;
      this.getNotifications(numberPage);
    }
  }

  goNext() {
    let numberPage: number = this.number;
    if (numberPage < this.totalPages - 1) {
      numberPage++;
      this.getNotifications(numberPage);
    }
  }

  goItem(i: number) {
    this.getNotifications(i);
  }

  search() {
    const obj = {content: this.searchForm.value.content};
    this.notificationService.searchByContent(obj).subscribe((value: any) => {
      this.notifications = value?.content;
      this.totalPages = value.totalPages;
      this.countTotalPages = new Array(value?.totalPages);
    }, error => {
      console.log(error);
    });
  }

}
