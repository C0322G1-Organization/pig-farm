import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {Advertisement} from '../model/advertisement';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AdvertisementService} from '../../service/advertisement.service';


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
  // xoa
  ids: number[] = [];
  deleteList: Advertisement[] = [];
// phan trang
  indexPagination = 0;
  pages: Array<number>;
  previousPageClass = 'inline-block';
  nextPageClass = 'inline-block';

  constructor(private adsService: AdvertisementService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getListAnhSearch();
  }

  getListAnhSearch() {
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

  deleteId() {
    if (this.ids.length > 0) {
      this.adsService.deleteAdvertisement(this.ids).subscribe(next => {
        this.getListAnhSearch();
        this.toastrService.success('Đã xóa quảng cáo thành công', 'Thông báo');
        this.ids = [];
      }, err => {
        console.log(err);
      });
    } else {
      this.toastrService.error('Chưa chọn mục để xóa !!!', 'Thông báo');
    }
    console.log(this.ids);
    if (this.advertisementList.length === 1 && this.indexPagination !== 0) {
      this.indexPagination = this.indexPagination - 1;
    }
    this.deleteList = [];
  }

  resetDelete() {
    this.deleteList = [];
    this.ids = [];
  }

  getListDelete(advertisement: Advertisement) {
    // for (let i = 0; i < this.deleteList.length; i++) {
    //   if (this.deleteList[i].id === advertisement.id) {
    //     this.deleteList.splice(i, 1);
    //     return;
    //   }
    // }
    // this.deleteList.push(advertisement);
    // this.ids = [];
    // for (let i = 0; i < this.deleteList.length; i++) {
    //   this.ids.push(this.deleteList[i].id);
    //   console.log(this.ids + ' id xoa');
    // }
    // console.log('ID : '+this.ids.length);
    // console.log('Delete lít : '+this.deleteList.length);
    // for (let i = 0; i < this.deleteList.length; i++) {
    //   if (this.deleteList[i].id === this.ids[i]) {
    //     this.ids.slice(i, 1);
    //     this.ids.push(this.deleteList[i].id);
    //     return;
    //   }
    // }
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === advertisement.id) {
        this.deleteList.splice(i, 1);
        return;
      }
    }
    this.deleteList.push(advertisement);
    this.ids = [];
    for (const item of this.deleteList) {
      this.ids.push(item.id);
    }
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === this.ids[i]) {
        this.ids.splice(i, 1);
        this.ids.push(this.deleteList[i].id);
        return;
      }
    }
  }

  checkbox(advertisement: Advertisement) {
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === advertisement.id) {
        return true;
      }
    }
    return false;
  }
}
