import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FoodService} from '../../service/food.service';
import {ToastrService} from 'ngx-toastr';
import {Food} from '../../model/food';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  foodList: Food[] = [];
  formSearch: FormGroup;
  searchName = '';
  page = 0;
  number = 0;
  totalPages = 0;
  private sort = 'id';
  amountValue = 'amount,asc';
  unitValue = 'unit,asc';
  foodTypeValue = 'storage.food_type,asc';
  idEdit: number;
  constructor(private foodService: FoodService, private toast: ToastrService) {

  }

  ngOnInit(): void {
    this.createForm();
    this.getAllFood(this.page, this.searchName, this.sort);
    this.toast.success('Chào mừng bạn đến với trại heo của chúng tôi', 'Quản lí thức ăn');
  }

  getAllFood(pageable: number, searchName: string, sort: string) {
    this.foodService.getAll(pageable, searchName, sort).subscribe((value: any) => {
      if (value != null) {
        this.foodList = value.content;
        this.number = value.number;
        this.totalPages = value.totalPages;
      } else {
        this.foodList = [];
        this.toast.success('không tìm thấy vui lòng tìm lại');
      }
    });
  }

  createForm() {
    this.formSearch = new FormGroup({
      type: new FormControl()
    });
  }

  searchByType() {
    this.getAllFood(this.page, this.formSearch.value.type, this.sort);
  }

  goPrevious() {
    if (this.page > 0) {
      this.page--;
    }
    this.getAllFood(this.page, this.searchName, this.sort);
  }

  goNext() {
    if (this.page < this.totalPages - 1) {
      this.page++;
    }
    this.getAllFood(this.page, this.searchName, this.sort);
  }

  sortAmount(amount: string) {
    if (amount === 'amount,asc') {
      this.sort = 'amount,asc';
      this.amountValue = 'amount,desc';
    } else {
      this.sort = 'amount,desc';
      this.amountValue = 'amount,asc';
    }
    this.getAllFood(this.page, this.searchName, this.sort);
  }

  sortUnit(unit: string) {
    if (unit === 'unit,asc') {
      this.sort = 'unit,asc';
      this.unitValue = 'unit,desc';
    } else {
      this.sort = 'unit,desc';
      this.unitValue = 'unit,asc';
    }
    this.getAllFood(this.page, this.searchName, this.sort);
  }

  sortFoodType(foodTypeValue: string) {
    if (foodTypeValue === 'storage.food_type,asc') {
      this.sort = 'storage.food_type,asc';
      this.foodTypeValue = 'storage.food_type,desc';
    } else {
      this.sort = 'storage.food_type,desc';
      this.foodTypeValue = 'storage.food_type,asc';
    }
    this.getAllFood(this.page, this.searchName, this.sort);
  }

  getValue(id: number) {
    this.idEdit = id;
    console.log(this.idEdit);
  }
}
