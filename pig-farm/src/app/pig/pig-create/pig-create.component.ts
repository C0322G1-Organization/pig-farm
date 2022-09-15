import {Component, OnInit} from '@angular/core';
import {Pig} from '../../model/pig';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {PigstyService} from '../../service/pigsty.service';
import {Pigsty} from '../../model/pigsty';
import {PigService} from '../../service/pig.service';

@Component({
  selector: 'app-pig-create',
  templateUrl: './pig-create.component.html',
  styleUrls: ['./pig-create.component.css']
})
export class PigCreateComponent implements OnInit {
  pigsty: Pigsty[];
  pig: Pig;
  isExitsCode: boolean;
  formPig = new FormGroup({
    id: new FormControl(),
    code: new FormControl('', [Validators.required,
      Validators.pattern('^(L-)[0-9]{3}$')]),
    dateIn: new FormControl('', Validators.required),
    dateOut: new FormControl('', Validators.required),
    status: new FormControl(0, Validators.required),
    weight: new FormControl('', [Validators.required, Validators.min(1),
      Validators.max(200)]),
    isDeleted: new FormControl(false),
    pigsty: new FormControl('', Validators.required),
  }, this.checkDateEnd);


  constructor(private pigService: PigService,
              private pigstyService: PigstyService,
              private toast: ToastrService,
              private router: Router) {
  }

  getAllPigsty() {
    this.pigstyService.getAllPigsty().subscribe(value => {
      this.pigsty = value;
    });
  }

  reset() {
    this.formPig = new FormGroup({
      code: new FormControl(''),
      dateIn: new FormControl(''),
      dateOut: new FormControl(''),
      status: new FormControl(1),
      weight: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getAllPigsty();
  }

  cancel() {
    this.toast.error('Thêm thất bại');
    this.router.navigateByUrl('/pig').then(r => console.log(r));
  }

  submitCreate() {
    console.log(this.formPig.value);

    console.log(this.formPig.value.pigsty);
    this.pigService.createPig(this.formPig.value).subscribe(value => {
      this.toast.success('Thêm mới thành công!');
      this.router.navigateByUrl('/pig').then(r => console.log(r));
    });
  }

  checkDate(abstractControl: AbstractControl): any {
    const start = new Date(abstractControl.value.dateIn);
    const end = new Date(abstractControl.value.dateOut);
    if (abstractControl.value.dateIn === '' || abstractControl.value.dateOut === '') {
      return null;
    }
    if (start < end) {
      return {errorDate: true};
    }
    return null;
  }

  checkDateEnd(abstractControl: AbstractControl): any {
    const start = new Date(abstractControl.value.dateIn);
    const now = new Date(abstractControl.value.dateOut);
    if (now.getFullYear() > start.getFullYear()) {
      return null;
    } else if (now.getFullYear() < start.getFullYear()) {
      return {checkDate: true};
    }
    if (now.getMonth() > start.getMonth()) {
      return null;
    } else if (now.getDate() < start.getDate()) {
      return {checkDate: true};
    } else {
      return null;
    }
  }

  checkCode($event) {
    this.pigService.checkCode(String($event)).subscribe(
      (check: any) => {
        if (check.value) {
          this.isExitsCode = true;
        } else {
          this.isExitsCode = false;
        }
      }
    );
  }
}
