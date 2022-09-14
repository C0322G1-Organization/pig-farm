import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StorageService} from '../storage.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-storage-create',
  templateUrl: './storage-create.component.html',
  styleUrls: ['./storage-create.component.css']
})
export class StorageCreateComponent implements OnInit {
  today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  storageList: Storage[];

  storageForm: FormGroup = new FormGroup({
    foodType: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    amount: new FormControl('', checkAmount),
    unit: new FormControl('', [Validators.required]),
    date: new FormControl(this.today, [Validators.required]),
  });

  foodType: string;

  constructor(private storageService: StorageService,
              private router: Router,
              private toastrService: ToastrService,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    return this.storageService.getAll(0, this.foodType).subscribe(storage => {
      this.storageList = storage;
    });
  }

  submit(): void {
    const storage = this.storageForm.value;
    this.storageService.saveStorage(storage).subscribe(() => {
      this.router.navigateByUrl('/storage/page');
      this.toastrService.success('Thêm thành công');
      this.storageForm.reset();
    }, e => console.log(e));
  }
}

function checkAmount(formControl: FormControl) {
  if (formControl.value === '') {
    return {name: true, message: 'Không được để trống'};
  }
  if (formControl.value < 1) {
    return {name: true, message: 'Số phải lớn hơn 0'};
  }
  if (formControl.value > 9999999999) {
    return {name: true, message: 'Độ dài tối đa 10 số'};
  }
  return null;
}
