import {Component, OnInit} from '@angular/core';
import {Vaccination} from '../model/vaccination';
import {FormControl, FormGroup} from '@angular/forms';
import {VaccinationService} from '../service/vaccination.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-vaccin-list',
  templateUrl: './vaccin-list.component.html',
  styleUrls: ['./vaccin-list.component.css']
})
export class VaccinationListComponent implements OnInit {
  vaccins: Vaccination[] = [];
  totalPages: number;
  number: number;
  countTotalPages: number[];
  msg: string;
  clss: string;
  nameDelete: any = [];
  ids: number[] = [];

  searchForm: FormGroup = new FormGroup({
    vaccinatedPerson: new FormControl('')
  });


  constructor(private vaccinService: VaccinationService,
              private router: Router,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getAll(0);
  }

  getAll(page: number) {
    // @ts-ignore
    // tslint:disable-next-line:variable-name
    this.vaccinService.findAll(page).subscribe((value: any) => {
      this.totalPages = value?.totalPages;
      this.countTotalPages = new Array(value?.totalPages);
      this.number = value?.number;
      this.vaccins = value?.content;
      console.log(value?.content);
    }, error => {
      console.log(error);
    });
  }

  goPrevious() {
    let numberPage: number = this.number;
    if (numberPage > 0) {
      numberPage--;
      this.getAll(numberPage);
    }
  }

  goNext() {
    let numberPage: number = this.number;
    if (numberPage < this.totalPages - 1) {
      numberPage++;
      this.getAll(numberPage);
    }
  }

  goItem(i: number) {
    this.getAll(i);
  }

  searchVaccin() {
    // tao const ojb de hung gia tri tu form
    const obj = {
      vaccinPersonSearch: this.searchForm.value.vaccinPerson,
    };
    console.log(this.searchForm.value.vaccinPerson);
    this.vaccinService.searchVaccination(obj).subscribe((value?: any) => {
      this.totalPages = value?.totalPages;
      this.countTotalPages = new Array(value?.totalPages);
      this.number = value?.number;
      // @ts-ignore
      this.vaccins = value?.content;
    }, error => {
      console.log(error);
    });
  }

  deleteId() {
    if (this.ids.length > 0) {
      this.vaccinService.deleteVaccination(this.ids).subscribe(value1 => {
        this.getAll(0);
        this.toast.success('Xóa thành công !!!', 'Thông báo');
        this.ids = [];
      }, err => {
        this.clss = 'rd';
        this.msg = 'Có sự cố khi xóa thông báo';
      });
    } else {
      this.clss = 'rd';
      this.msg = 'Bạn phải chọn mới có thể tiến hành xoá';
    }
    this.nameDelete = [];
  }

  checkDelete(value: any) {
    this.ids = [];
    this.nameDelete = [];
    for (const valueElement of this.vaccins) {
      if (value[valueElement.id] === true) {
        this.ids.push(valueElement.id);
      }
    }
    // tslint:disable-next-line:no-shadowed-variable
    this.vaccinService.findAll(0).subscribe((value: any) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.ids.length; i++) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < value?.content.length; j++) {
          if (this.ids.includes(this.ids[i]) && this.ids[i] === value?.content[j].id) {
            this.nameDelete.splice(i, 1);
            this.nameDelete.push(value?.content[j].vaccinatedPerson);
          }
        }
      }
    });
    console.log(this.nameDelete);
  }

  resetDelete() {
    this.nameDelete = [];
    this.ids = [];
  }
}
