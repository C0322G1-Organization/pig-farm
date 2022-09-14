import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Contact} from '../../model/contact';
import {ContactService} from '../../service/contact.service';

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
  informationDelete: Contact[] = [];
  checkContent = false;

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
        this.checkContent = false;
        console.log(this.contact);
      }, (error) => {
        this.contact = [];
        this.checkContent = true;
      }
    );
  }

  deleteId() {
    const id: number[] = [];
    for (const argument of this.informationDelete) {
      id.push(argument.id);
    }
    if (id.length > 0) {
      this.contactService.deleteContact(id).subscribe(value1 => {
        this.getContact(0, '');
        this.toast.error('Xóa thành công !!!', 'Liên hệ');
        this.informationDelete = [];
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

}
