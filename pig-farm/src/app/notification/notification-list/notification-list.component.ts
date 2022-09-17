import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NotificationService} from '../../service/notification.service';
import {Notifications} from '../../model/notification';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  msg: string;
  clss: string;
  notifications: Notifications[] = [];
  ids: number[] = [];
  title: any;
  searchForm = new FormGroup({
    content: new FormControl('')
  });
  deleteList: Notifications[] = [];
// pagination
  number: number;
  indexPagination = 0;
  totalPage: Array<number>;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  totalElements = 0;
  pageSize: number;
  displayPagination = 'inline-block';
  numberOfElement = 0;
  contentSearch = '';


  constructor(private notificationService: NotificationService,
              private router: Router,
              private toast: ToastrService,
              private title1: Title) {
    this.title1.setTitle('Đăng thông báo');
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.notificationService.getAllNotifications(this.indexPagination, this.contentSearch, this.pageSize).subscribe((data?: any) => {
      if (data === null) {
        this.totalPage = new Array(0);
        this.notifications = [];
        this.displayPagination = 'none';
        this.toast.warning('Không có dữ liệu.', 'Chú ý');
      } else {
        this.number = data?.number;
        this.pageSize = data?.size;
        this.numberOfElement = data?.numberOfElements;
        this.notifications = data.content;
        this.totalElements = data?.totalElements;
        this.totalPage = new Array(data?.totalPages);
      }
      this.checkPreviousAndNext();
    });
  }

  previousPage(event: any) {
    event.preventDefault();
    this.indexPagination--;
    this.ngOnInit();
  }

  nextPage(event: any) {
    event.preventDefault();
    this.indexPagination++;
    this.ngOnInit();
  }

  checkPreviousAndNext() {
    if (this.indexPagination === 0) {
      this.previousPageStyle = 'none';
    } else if (this.indexPagination !== 0) {
      this.previousPageStyle = 'inline-block';
    }
    if (this.indexPagination < (this.totalPage.length - 1)) {
      this.nextPageStyle = 'inline-block';
    } else if (this.indexPagination === (this.totalPage.length - 1) || this.indexPagination > (this.totalPage.length - 1)) {
      this.nextPageStyle = 'none';
    }
  }

  checkRegex(content: string): boolean {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(content);
  }

  search() {
    this.contentSearch = this.searchForm.value.content;

    if (this.checkRegex(this.contentSearch)) {
      this.indexPagination = 0;
      this.totalPage = new Array(0);
      this.notifications = [];
      this.displayPagination = 'none';
      this.checkPreviousAndNext();
      this.toast.warning('Không được nhập kí tự đặc biệt.', 'Chú ý');
    } else {
      this.indexPagination = 0;
      this.displayPagination = 'inline-block';
      this.ngOnInit();
      console.log('vao');
    }
  }

  totalElement($event: any) {
    switch ($event.target.value) {
      case '5':
        this.pageSize = 5;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case '10':
        this.pageSize = 10;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case '15':
        this.pageSize = 15;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case 'full':
        this.pageSize = this.totalElements;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
    }
  }


  deleteId() {
    if (this.ids.length > 0) {
      this.notificationService.deleteNotifications(this.ids).subscribe(value1 => {
        this.getList();
        this.toast.success('Xóa thành công ', 'Thông báo');
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
    this.ids = [];

  }


  getListDelete(notificationDelete: Notifications) {
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === notificationDelete.id && this.ids.length > 0) {
        this.deleteList.splice(i, 1);
        this.ids.splice(i, 1);
        return;
      }
    }
    this.deleteList.push(notificationDelete);
    for (const item of this.deleteList) {
      this.ids.push(item.id);
    }
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === this.ids[i]) {
        this.ids.splice(i, 1);
        return;
      }
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

  isAllCheckBoxChecked() {
    for (const item of this.notifications) {
      if (!this.ids.includes(item.id)) {
        this.deleteList.push(item);
        this.ids.push(item.id);
      }
    }
  }

  resetDelete() {
    this.ids = [];
  }
}
