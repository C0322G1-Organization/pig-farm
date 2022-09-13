import { Component, OnInit } from '@angular/core';
import {Food} from '../model/food';
import {FormControl, FormGroup} from '@angular/forms';
import {FoodService} from '../service/food.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.css']
})
export class ListFoodComponent implements OnInit {
  foodList: Food[] = [];
  formSearch: FormGroup;
  searchName = '';
  page = 0;
  number: number;
  totalPages = 0;

  constructor(private foodService: FoodService, private toast: ToastrService) {

  }

  ngOnInit(): void {
    this.getAllFood(this.page, this.searchName);
    this.toast.success('chào mừng bạn đến với chúng tôi', 'Quản lí thức ăn' );
  }
  getAllFood(pageable: number, searchName: string) {
    this.foodService.getAll(pageable, searchName).subscribe((value: any) => {
        if (value != null) {
          this.foodList = value.content;
          this.number = value?.number;
          this.totalPages = value.totalPages;
        } else {
          this.foodList = [];
          this.toast.success('không tìm thấy vui lòng tìm lại');
        }
      }, error => {},
      () => {
        this.createForm();
      });
  }

  createForm() {
    this.formSearch = new FormGroup({
      type: new FormControl('')
    });
  }

  searchByType() {
    this.getAllFood(this.page, this.formSearch.value.type);
  }

  goPrevious() {
    if (this.page > 0) {
      this.page--;
    }
    this.getAllFood(this.page, this.searchName);
  }

  goNext() {
    if (this.page < this.totalPages - 1) {
      this.page++;
    }
    this.getAllFood(this.page, this.searchName);
  }
}
