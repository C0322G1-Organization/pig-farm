import {Component, OnInit} from '@angular/core';
import {Vaccination} from '../../model/vaccination';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {VaccinationService} from '../../service/vaccination.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-vaccination-list',
  templateUrl: './vaccination-list.component.html',
  styleUrls: ['./vaccination-list.component.css']
})
export class VaccinationListComponent implements OnInit {
  vaccins: Vaccination[] = [];
  number: number;
  msg: string;
  clss: string;
  nameDelete: any = [];
  ids: number[] = [];
  checkNext: boolean;
  nameContent = '';
  informationDelete: Vaccination[] = [];
  public e: any;

  displayPagination = 'inline-block';
  pageSize = 5;
  indexPagination = 0;
  numberOfElement = 0;
  totalElements = 0;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  pages: Array<number>;
  searchForm: FormGroup = new FormGroup({
    vaccinPerson: new FormControl('')
  });


  constructor(private vaccinService: VaccinationService,
              private router: Router,
              private toast: ToastrService,
              private title: Title) {
    this.title.setTitle('Thông tin tiêm phòng');
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.vaccinService.findAll(this.indexPagination, this.nameContent, this.pageSize).subscribe(value => {
        if (value == null) {
          this.vaccins = [];
          this.displayPagination = 'none';
          this.pages = new Array(0);
          this.toast.warning('Không có dữ liệu.', 'Chú ý');
        } else {
          this.numberOfElement = value.numberOfElements;
          this.vaccins = value.content;
          this.totalElements = value.totalElements;
          this.pages = new Array(value.totalPages);
        }
        this.checkPreviousAndNext();
      }
    );
  }

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

  searchVaccin() {
    this.nameContent = this.searchForm.value.vaccinPerson.trim();
    if (this.checkRegex(this.nameContent)) {
      this.indexPagination = 0;
      this.pages = new Array(0);
      this.vaccins = [];
      this.displayPagination = 'none';
      this.checkPreviousAndNext();
      this.toast.warning('Không được nhập kí tự đặc biệt.', 'Chú ý');
    } else {
      this.indexPagination = 0;
      this.displayPagination = 'inline-block';
      this.getAll();
    }
  }

  checkRegex(name: string): boolean {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(name);
  }

  deleteId() {
    const id: number[] = [];
    for (const argument of this.informationDelete) {
      id.push(argument.id);
    }
    if (id.length > 0) {
      this.vaccinService.deleteVaccination(id).subscribe(value1 => {
        this.indexPagination = 0;
        this.nameContent = '';
        this.getAll();
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

  getListDelete(vaccinationDelete: Vaccination) {
    for (let i = 0; i < this.informationDelete.length; i++) {
      if (this.informationDelete[i].id === vaccinationDelete.id) {
        this.informationDelete.splice(i, 1);
        return;
      }
    }
    this.informationDelete.push(vaccinationDelete);
  }

  checkbox(notificationDelete: Vaccination) {
    for (const item of this.informationDelete) {
      if (item.id === notificationDelete.id) {
        return true;
      }
    }
    return false;
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
      case 'full list' :
        this.pageSize = this.totalElements;
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
