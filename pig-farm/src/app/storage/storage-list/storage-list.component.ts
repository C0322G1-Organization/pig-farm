import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.css']
})
export class StorageListComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({
    foodType: new FormControl('')
  });
  storageList: Storage[] = [];
  totalPages: number;
  number: number;
  countTotalPages: number[];

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.getAll(0);
  }

  getAll(page: number) {
    // @ts-ignore
    // tslint:disable-next-line:variable-name
    this.storageService.getAll(page).subscribe(({content, number: number, totalPages: totalPages}: Storage[]) => {
      this.totalPages = totalPages;
      this.countTotalPages = new Array(totalPages);
      this.number = number;
      this.storageList = content;
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

  searchStorage() {
// tao const ojb de hung gia tri tu form
    const obj = {
      foodType: this.searchForm.value.foodType,
    };
    console.log(this.searchForm.value.foodType);
    // @ts-ignore
    this.storageService.searchStorage(obj).subscribe((value: Storage[]) => {
      // @ts-ignore
      this.storageList = value.content;
    }, error => {
      console.log(error);
    });
  }

}
