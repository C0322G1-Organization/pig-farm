import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// @ts-ignore

// @ts-ignore
import {AdsService} from './service/ads.service';
import {ToastrService} from 'ngx-toastr';
import {Advertisement} from '../model/advertisement';
import {AdvertisementService} from '../service/advertisement.service';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({
    titleSearch: new FormControl('', Validators.maxLength[20])
  });
  advertisementList: Advertisement[] = [];
  totalPages: number;
  number: number;
  // xoa
  ids: number[] = [];
  titleDelete: any [];
  check: string[] = [];
  editId: string;
// phan trang
  indexPagination = 0;
  pages: Array<number>;
  previousPageClass = 'inline-block';
  nextPageClass = 'inline-block';

  constructor(private adsService: AdvertisementService, private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getListAnhSearch();
  }

  getListAnhSearch() {
    this.check = [];
    this.adsService.getListAndSearch(this.indexPagination, this.searchForm.value.titleSearch).subscribe((data?: any) => {
      if (data === null) {
        this.pages = new Array(0);
        this.advertisementList = [];
      } else {
        this.number = data?.number;
        this.advertisementList = data?.content;
        this.pages = new Array(data?.totalPages);
      }
      this.checkPreviousAndNext();
    });
  }

  previousPage(event: any) {
    event.preventDefault();
    this.indexPagination--;
    this.checkPreviousAndNext();
    this.ngOnInit();
  }

  setPage(i: number, event: any) {
    event.preventDefault();
    this.indexPagination = i;
    this.checkPreviousAndNext();
    this.getListAnhSearch();
  }

  nextPage(event: any) {
    event.preventDefault();
    this.indexPagination++;
    this.checkPreviousAndNext();
    this.ngOnInit();
  }

// kiem tra hien thi nut tiep theo va truoc
  checkPreviousAndNext() {
    if (this.indexPagination === 0) {
      this.previousPageClass = 'none';
    } else if (this.indexPagination !== 0) {
      this.previousPageClass = 'inline-block';
    }
    if (this.indexPagination < (this.pages.length - 1)) {
      this.nextPageClass = 'inline-block';
    } else if (this.indexPagination === (this.pages.length - 1) || this.indexPagination > (this.pages.length - 1)) {
      this.nextPageClass = 'none';
    }
  }

  searchAds() {
    this.indexPagination = 0;
    this.getListAnhSearch();
  }

// lấy id và tên title được chọn
  checkId(value: any) {
    this.ids = [];
    this.titleDelete = [];
    for (let i = 0; i < this.advertisementList.length; i++) {
      if (value[this.advertisementList[i].id] === true) {
        this.ids.push(this.advertisementList[i].id);
        this.titleDelete.push(this.advertisementList[i].title);
      }
    }
  }

  deleteId() {
    this.check = [];
    if (this.ids.length > 0) {
      this.adsService.deleteAdvertisement(this.ids).subscribe(next => {

        this.getListAnhSearch();
        this.toast.success('Đã xóa: ' + this.ids.length + ' quảng cáo thành công', 'Thông báo');
        this.ids = [];
      }, err => {
      });
    } else {
      this.toast.error('Chưa chọn mục để xóa !!!', 'Thông báo');
    }
    this.titleDelete = [];
    console.log(this.ids);
    if (this.advertisementList.length === 1 && this.indexPagination !== 0) {
      this.indexPagination = this.indexPagination - 1;
    }

  }

  resetDelete() {
    this.titleDelete = [];
    this.ids = [];
  }

  checkButton(value: any) {
    // tìm trùng lặp trong mảng check
    if (this.check.includes(value)) {
      // lọc những data khác value
      this.check.filter(item => item !== value);
      for (let i = 0; i < this.check.length; i++) {
        if (this.check[i] === value) {
          this.check.splice(i, 1);
        }
      }
    } else {
      console.log(this.check);
      this.check.push(value);
    }
    if (this.check.length > 1) {
      this.editId = null;
    } else {
      this.editId = this.check[0];
      console.log(this.editId);
    }
  }


  // getListAdvertisement(page: number) {
  //   this.adsService.getAll(page).subscribe((value?: any) => {
  //     this.totalPages = value?.totalPages;
  //     this.countTotalPages = new Array(value?.totalPages);
  //     this.number = value?.number;
  //     this.advertisementList = value?.content;
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  // searchAdvertisement() {
  //   const objSearch = {
  //     title: this.searchForm.value.titleSearch,
  //   };
  //   console.log(this.searchForm.value.titleSearch);
  //   this.adsService.searchAdvertisement(objSearch).subscribe((value?: any) => {
  //     this.totalPages = value?.totalPages;
  //     this.countTotalPages = new Array(value?.totalPages);
  //     this.number = value?.number;
  //     this.advertisementList = value?.content;
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  // goPrevious() {
  //   this.check = [];
  //   let numberPage: number = this.number;
  //   if (numberPage > 0) {
  //     numberPage--;
  //     this.getListAdvertisement(numberPage);
  //   }
  // }
  //
  // goNext() {
  //   this.check = [];
  //   let numberPage: number = this.number;
  //   if (numberPage < this.totalPages - 1) {
  //     numberPage++;
  //     this.getListAdvertisement(numberPage);
  //   }
  // }
  //
  // goItem(i: number) {
  //   this.check = [];
  //   this.getListAdvertisement(i);
  // }

}
