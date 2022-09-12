import {Component, OnInit} from '@angular/core';
import {Food} from '../model/food';
import {FoodService} from '../service/food.service';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.css']
})

export class ListFoodComponent implements OnInit {

  foodList: Food[] = [];
  constructor(private foodService: FoodService) {

  }

  ngOnInit(): void {
    this.getSearchFood();
  }
  getSearchFood() {
    this.foodService.getAll().subscribe(value => {
      // @ts-ignore
      if (value != null) {
        // @ts-ignore
        this.foodList = value.content;
      } else {
        this.foodList = value;
      }
    });
  }
}
