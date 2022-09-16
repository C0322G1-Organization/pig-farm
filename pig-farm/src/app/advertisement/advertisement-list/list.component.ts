import {Component, OnInit} from '@angular/core';
// @ts-ignore

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AdvertisementService} from '../../service/advertisement.service';
import {Advertisement} from '../../model/advertisement';


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
  // xoa
  ids: number[] = [];
  deleteList: Advertisement[] = [];
// phan trang
  number: number;
  checkNext: boolean;
  checkPreview: boolean;
  titleSearchs = '';


  constructor(private adsService: AdvertisementService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getListAnhSearch(0, '');
  }

  getListAnhSearch(page: number, titleSearch: string) {
    this.adsService.getListAndSearch(page, titleSearch).subscribe((value?: any) => {
      this.number = value?.number;
      this.advertisementList = value?.content;
      this.checkNext = !value.last;
      this.checkPreview = !value.first;
    });
  }

  goPrevious() {
    this.number--;
    this.getListAnhSearch(this.number, this.titleSearchs);
  }

  goNext() {
    this.number++;
    this.getListAnhSearch(this.number, this.titleSearchs);
  }

  searchAds() {
    this.titleSearchs = this.searchForm.value.titleSearch;
    this.getListAnhSearch(0, this.titleSearchs);
  }

  deleteId() {
    if (this.ids.length > 0) {
      this.adsService.deleteAdvertisement(this.ids).subscribe(next => {
        this.getListAnhSearch(0, this.titleSearchs);
        this.toastrService.success('Đã xóa quảng cáo thành công', 'Thông báo');
        this.ids = [];
      }, err => {
        console.log(err);
        this.toastrService.error('Không tồn tại');
      });
    }
    this.deleteList = [];
  }

  resetDelete() {
    this.deleteList = [];
    this.ids = [];
  }

  getListDelete(advertisement: Advertisement) {
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === advertisement.id) {
        this.deleteList.splice(i, 1);
        return;
      }
    }
    this.deleteList.push(advertisement);
    this.ids = [];
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === this.ids[i]) {
        this.ids.splice(i, 1);
        return;
      }
    }
    for (const item of this.deleteList) {
      this.ids.push(item.id);
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
