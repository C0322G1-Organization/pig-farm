import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../service/storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-storage-employee-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.css']
})
export class StorageListComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({
    foodType: new FormControl('', [Validators.maxLength(100)])
  });
  storageList: Storage[] = [];
  number: number;
  foodType = '';
  checkNext: boolean;
  checkPreview: boolean;

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.getAll(0, '');
  }

  getAll(page: number, foodType: string) {
    this.storageService.getAll(page, foodType).subscribe((value: any) => {
      this.number = value?.number;
      this.storageList = value?.content;
      this.checkNext = !value.last;
      this.checkPreview = !value.first;
    }, error => {
      console.log(error);
    });
  }

  goPrevious() {
    this.number--;
    this.getAll(this.number, this.foodType);
  }

  goNext() {
    this.number++;
    this.getAll(this.number, this.foodType);
  }

  searchStorage() {
    this.foodType = this.searchForm.value.foodType;
    this.getAll(0, this.foodType);
  }
}
