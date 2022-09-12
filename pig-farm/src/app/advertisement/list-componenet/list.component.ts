import {Component, OnInit} from '@angular/core';
import {AdsService} from '../service/ads.service';
import {Advertisement} from '../model/advertisement';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-componenet',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({
    titleSearch: new FormControl('')
  });
  advertisementList: Advertisement[] = [];
  totalPages: number;
  number: number;
  countTotalPages: number[];
  ids: number[] = [];
  titleDelete: any [];
  check: string[] = [];
  editId: string;

  constructor(private adsService: AdsService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getListAdvertisement(0);
  }

  getListAdvertisement(page: number) {
    this.adsService.getAll(page).subscribe((value?: any) => {
      this.totalPages = value?.totalPages;
      console.log(this.totalPages);
      this.countTotalPages = new Array(value?.totalPages);
      console.log(this.countTotalPages);
      this.number = value?.number;
      console.log(this.number);
      this.advertisementList = value?.content;
    }, error => {
      console.log(error);
    });
  }

  checkId(value: any) {
    this.ids = [];
    for (const valueElement of this.advertisementList) {
      if (value[valueElement.id] === true) {
        this.ids.push(valueElement.id);
      }
    }
    // tslint:disable-next-line:no-shadowed-variable
    this.adsService.getAll(0).subscribe((listAds: any) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.ids.length; i++) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < listAds?.content.length; j++) {
          if (this.ids.includes(this.ids[i]) && this.ids[i] === listAds?.content[j].id) {
            this.titleDelete.splice(i, 1);
            this.titleDelete.push(listAds?.content[j].title);
          }
        }
      }
    });
  }

  deleteId() {
    this.check = [];
    if (this.ids.length > 0) {
      this.adsService.deleteAdvertisement(this.ids).subscribe(next => {
        this.getListAdvertisement(0);
        this.toastrService.success('Xóa thành công !!!', 'Thông báo');
        this.ids = [];
      }, err => {
      });
    } else {
      this.toastrService.error('Chưa chọn mục để xóa !!!', 'Thông báo');
    }
    this.titleDelete = [];
  }

  resetDelete() {
    this.titleDelete = [];
    this.ids = [];
  }

  checkButton(value: any) {
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

  searchAdvertisement() {
    const objSearch = {
      title: this.searchForm.value.titleSearch,
    };
    console.log(this.searchForm.value.titleSearch);
    this.adsService.searchAdvertisement(objSearch).subscribe((value?: any) => {
      this.totalPages = value?.totalPages;
      this.countTotalPages = new Array(value?.totalPages);
      this.number = value?.number;
      this.advertisementList = value?.content;
    }, error => {
      console.log(error);
    });
  }

  goPrevious() {
    let numberPage: number = this.number;
    if (numberPage > 0) {
      numberPage--;
      this.getListAdvertisement(numberPage);
    }
  }

  goNext() {
    let numberPage: number = this.number;
    if (numberPage < this.totalPages - 1) {
      numberPage++;
      this.getListAdvertisement(numberPage);
    }
  }

  goItem(i: number) {
    this.getListAdvertisement(i);
  }
}
