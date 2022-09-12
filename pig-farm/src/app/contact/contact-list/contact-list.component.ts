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
  name: string;
  totalPages: number;
  number: number;
  countTotalPages: number[];
  contact: Contact[] = [];
  searchForm = new FormGroup({
    name: new FormControl('')
  });
  contacts: Contact;
  nameDelete: any = [];
  ids: number[] = [];

  constructor(private contactService: ContactService,
              private router: Router,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getContact(0);
  }

  getContact(page: number) {
    this.contactService.getAllContact(page).subscribe((value: any) => {
      this.totalPages = value?.totalPages;
      this.countTotalPages = new Array(value?.totalPages);
      this.number = value?.number;
      this.contact = value?.content;
      this.msg = '';
    }, error => {
      console.log(error);
    });
  }

  deleteId() {
    if (this.ids.length > 0) {
      this.contactService.deleteContact(this.ids).subscribe(value1 => {
        this.getContact(0);
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
    this.nameDelete = [];
    this.ids = [];
    this.msg = '';
    for (const valueElement of this.contact) {
      if (value[valueElement.id] === true) {
        this.ids.push(valueElement.id);
      }
    }
    // tslint:disable-next-line:no-shadowed-variable
    this.contactService.getAllContact(0).subscribe((value: any) => {
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

  resetDelete() {
    this.nameDelete = [];
    this.ids = [];
  }

  goPrevious() {
    let numberPage: number = this.number;
    if (numberPage > 0) {
      numberPage--;
      console.log(numberPage--);
      this.getContact(numberPage);
    }
  }

  goNext() {
    let numberPage: number = this.number;
    if (numberPage < this.totalPages - 1) {
      numberPage++;
      this.getContact(numberPage);
    }
  }

  goItem(i: number) {
    this.getContact(i);
  }

  search() {
    const obj = {content: this.searchForm.value.name};
    this.contactService.search(obj).subscribe((value: any) => {
      this.contact = value.content;
    }, error => {
      console.log(error);
    });
  }

}
