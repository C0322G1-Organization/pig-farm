import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StorageService} from '../storage.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-storage-employee-create',
  templateUrl: './storage-create.component.html',
  styleUrls: ['./storage-create.component.css']
})
export class StorageCreateComponent implements OnInit {

  storageList: Storage[];

  storageForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    foodType: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.pattern('[1-9][0-9]*')]),
    unit: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  });

  foodType: string;

  constructor(private storageService: StorageService,
              private router: Router,
              private toastrService: ToastrService) {
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
