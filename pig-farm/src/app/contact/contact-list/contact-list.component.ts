import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Contact} from '../../model/contact';
import {ContactService} from '../../service/contact.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  msg: string;
  clss: string;
  totalPages: number;
  number = 0;
  contactList: Contact[] = [];
  searchForm = new FormGroup({
    name: new FormControl('')
  });

  contacts: Contact;
  nameDelete: any = [];
  ids: number[] = [];
  content = '';

  check: any[] = [];
  contactDetail: Contact = {};
  informationDelete: Contact[] = [];
  checkContent = false;

  // Search
  name = '';

  // Pagination
  displayPagination = 'inline-block';
  pageSize = 5;
  indexPagination = 0;
  numberOfElement = 0;
  totalElements = 0;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';

  countTotalPages: number[];
  pages: Array<number>;

  constructor(private contactService: ContactService,
              private router: Router,
              private toast: ToastrService,
              private title: Title) {
    this.title.setTitle('Danh Sách Liên Hệ');
  }

  ngOnInit(): void {
    this.getContact();

  }

  getContact() {
    this.contactService.getAllContact(this.indexPagination, this.name, this.pageSize).subscribe(value => {
        if (value == null) {
          this.contactList = [];
          this.displayPagination = 'none';
          this.pages = new Array(0);
          this.toast.warning('Không có dữ liệu.', 'Chú ý');
        } else {
          this.numberOfElement = value.numberOfElements;
          this.contactList = value.content;
          this.totalElements = value.totalElements;
          this.pages = new Array(value.totalPages);
        }
        this.checkPreviousAndNext();
      } , error => {
        this.contactList = null;
      }
    );
  }
  // kiem tra hien thi nut tiep theo va truoc
  checkPreviousAndNext() {
    if (this.indexPagination === 0) {
      this.previousPageStyle = 'none';
    } else if (this.indexPagination !== 0) {
      this.previousPageStyle = 'inline-block';
    }
    if (this.indexPagination < (this.pages.length - 1)) {
      this.nextPageStyle = 'inline-block';
    } else if (this.indexPagination === (this.pages.length - 1) || this.indexPagination > (this.pages.length - 1)) {
      this.nextPageStyle = 'none';
    }
  }

  deleteId() {
    const id: number[] = [];
    for (const argument of this.informationDelete) {
      id.push(argument.id);
    }
    if (id.length > 0) {
      this.contactService.deleteContact(id).subscribe(value1 => {
        this.indexPagination = 0;
        this.name = '';
        this.getContact();
        this.toast.success('Xóa thành công', 'Liên hệ');
        this.informationDelete = [];
      }, err => {
        this.clss = 'rd';
        this.msg = 'Có sự cố khi xóa liên hệ';
      });
    } else {
      this.clss = 'rd';
      this.msg = 'Bạn phải chọn liên hệ mới thực hiện được chức năng này.';
      this.toast.error('Bạn phải chọn mục để xóa', 'Liên hệ');
    }
    this.nameDelete = [];
  }

  resetDelete() {
    this.nameDelete = [];
    this.ids = [];
  }

  search() {
    this.name = this.searchForm.value.name.trim();
    if (this.checkRegex(this.name)) {
      this.indexPagination = 0;
      this.pages = new Array(0);
      this.contactList = [];
      this.displayPagination = 'none';
      this.checkPreviousAndNext();
      this.toast.warning('Không được nhập kí tự đặc biệt.', 'Chú ý');
    } else {
      this.indexPagination = 0;
      this.displayPagination = 'inline-block';
      this.getContact();
    }
  }

  checkRegex(name: string): boolean {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(name);
  }

  getDetails() {
    this.contactDetail = this.informationDelete[0];
  }

  checkbox(contact: Contact) {
    for (const item of this.informationDelete) {
      if (item.id === contact.id) {
        return true;
      }
    }
    return false;
  }

  checkList(contact: Contact) {
    for (let i = 0; i < this.informationDelete.length; i++) {
      if (this.informationDelete[i].id === contact.id) {
        this.informationDelete.splice(i, 1);
        return;
      }
    }
    this.informationDelete.push(contact);
  }

  showDetail() {
    return !(this.informationDelete.length === 1);
  }


  changePageSize(event: any) {
    switch (event.target.value) {
      case '5' :
        this.pageSize = 5;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case '10' :
        this.pageSize = 10;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
    }
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
}
