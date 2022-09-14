import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Contact} from '../model/contact';
import {ContactService} from '../service/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  msg: string;
  clss: string;
  name = '';
  totalPages: number;
  number = 0;
  countTotalPages: number[];
  contact: Contact[] = [];
  searchForm = new FormGroup({
    name: new FormControl('')
  });
  contacts: Contact;
  nameDelete: any = [];
  ids: number[] = [];
  content = '';
  checkNext: boolean;
  checkPrevious: boolean;
  check: any[] = [];
  contactDetail: Contact = {};

  constructor(private contactService: ContactService,
              private router: Router,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getContact(0, '');
  }

  getContact(page: number, name: string) {
    this.contactService.getAllContact(page, name).subscribe((value: any) => {
      this.totalPages = value?.totalPages;
      this.countTotalPages = new Array(value?.totalPages);
      this.number = value?.number;
      this.contact = value?.content;
      this.checkNext = !value.last;
      this.checkPrevious = !value.first;
      this.msg = '';
    }, error => {
      console.log(error);
    });
  }

  deleteId() {
    this.check = [];
    if (this.ids.length > 0) {
      this.contactService.deleteContact(this.ids).subscribe(value1 => {
        this.getContact(0, '');
        this.toast.error('Xóa thành công !!!', 'Liên hệ');
        this.ids = [];
      }, err => {
        this.clss = 'rd';
        this.msg = 'Có sự cố khi xóa liên hệ';
      });
    } else {
      this.clss = 'rd';
      this.msg = 'Bạn phải chọn liên hệ mới thực hiện được chức năng này';
      this.toast.error('Bạn phải chọn mục để xóa !!!', 'Liên hệ');
    }
    this.nameDelete = [];
  }

  checkDelete(value: any) {
    this.ids = [];
    this.msg = '';
    this.nameDelete = [];
    this.contact.forEach(item => {
      if (value[item.id] === true) {
        this.ids.push(item.id);
        this.nameDelete.push(item.name);
      }
    });
    this.contactService.getAllContact(0, '').subscribe(() => {
    });
  }

  resetDelete() {
    this.nameDelete = [];
    this.ids = [];
  }

  goPrevious() {
    this.number--;
    this.getContact(this.number, this.name);
  }

  goNext() {
    this.number++;
    this.getContact(this.number, this.name);
  }

  search() {
    this.name = this.searchForm.value.name;
    this.getContact(0, this.name);
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
  }

  getDetails() {
    this.contactService.getContactById(this.check[0]).subscribe(value => {
      this.contactDetail = value;
    });
  }
}
