import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FoodServiceService} from '../service/food-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Pigsty} from '../../model/pigsty';
import {StorageService} from '../../service/storage.service';
import {PigstyService} from '../../service/pigsty.service';
import {Storage} from '../../model/storage';
@Component({
  selector: 'app-food-create',
  templateUrl: './food-create.component.html',
  styleUrls: ['./food-create.component.css']
})
export class FoodCreateComponent implements OnInit {
  pigsties: Pigsty[] = [];
  storages: Storage[] = [];

  foodForm: FormGroup = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    unit: new FormControl('', [Validators.required]),
    storage: new FormControl('', [Validators.required]),
    pigsty: new FormControl('', [Validators.required]),
  });

  constructor(private pigstyService: PigstyService,
              private storageService: StorageService,
              private foodService: FoodServiceService,
              private router: Router,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    // this.getPigsties();
    this.getStorages();
    console.log(this.getStorages());
  }

  getPigsties(): void {
    this.pigstyService.getAll().subscribe((pigstyService?: any) => {
      this.pigsties = pigstyService.content;
    });
  }

  getStorages(): void {
    // @ts-ignore
    this.storageService.getAll().subscribe((storageService?: any) => {
      console.log(storageService.content);
      this.storages = storageService.content;
    });
  }

  submit() {
    const food = this.foodForm.value;
    food.storage = {
      id: +food.storage
    };
    food.pigsty = {
      id: +food.pigsty
    };
    console.log(food);
    this.foodService.saveFood(food).subscribe(() => {
    }, error => {
      console.log(error);
    }, () => {
      this.foodForm.reset();
      this.router.navigate(['/food/create']);
      this.toast.success('Thêm mới thành công', 'Thông báo');
    });
  }
}
