import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FoodService} from '../../service/food.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Pigsty} from '../../model/pigsty';
import {PigstyService} from '../../service/pigsty.service';
import {StorageService} from '../../service/storage.service';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrls: ['./food-edit.component.css']
})
export class FoodEditComponent implements OnInit {
  foodForm: FormGroup = new FormGroup({
    amount: new FormControl(''),
    unit: new FormControl(''),
    storage: new FormControl(''),
    pigsty: new FormControl(''),
  });
  pigsties: Pigsty[] = [];
  id: number;
  storages: Storage[] = [];

  constructor(private pigstyService: PigstyService,
              private storageService: StorageService,
              private foodService: FoodService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toast: ToastrService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getFood(this.id);
    });
  }

  compareWithId(item1, item2) {
    return item1 && item2 && item1.id === item2.id;
  }

  ngOnInit(): void {
    this.getStorages();
  }

  getPigsties(): void {
    // @ts-ignore
    this.pigstyService.getAll().subscribe((pigstyService?: any) => {
      this.pigsties = pigstyService.content;
    });
  }

  getStorages(): void {
    // @ts-ignore
    this.storageService.getAll().subscribe((storageService?: any) => {
      this.storages = storageService.content;
    });
  }

  getFood(id: number) {
    return this.foodService.findById(id).subscribe(food => {
      this.foodForm = new FormGroup({
        amount: new FormControl(food.amount, [Validators.required, Validators.pattern('\\d')]),
        unit: new FormControl(food.unit, [Validators.required]),
        storage: new FormControl(food.storage.id, [Validators.required]),
        pigsty: new FormControl(food.pigsty.id, [Validators.required]),
      });
    });

  }

  editFood(id: number) {
    const food = this.foodForm.value;
    food.storage = {
      id: +food.storage
    };
    food.pigsty = {
      id: +food.pigsty
    };
    this.foodService.editFood(id, food).subscribe(() => {
    }, error => {
      console.log(error);
    }, () => {
      this.foodForm.reset();
      this.router.navigate(['/food/create']);
      this.toast.success('Cập nhập thành công', 'Thông báo');
    });
  }
}
