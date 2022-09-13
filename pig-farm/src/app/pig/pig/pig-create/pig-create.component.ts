import {Component, OnInit} from '@angular/core';
import {Pig} from '../../model/pig';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PigService} from '../../service/pig.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {PigstyService} from '../../service/pigsty.service';
import {Pigsty} from '../../model/pigsty';

@Component({
  selector: 'app-pig-create',
  templateUrl: './pig-create.component.html',
  styleUrls: ['./pig-create.component.css']
})
export class PigCreateComponent implements OnInit {
  pigsty: Pigsty[];
  pig: Pig[];
  control: FormControl;
  isDeleted = false;
  formPig = new FormGroup({
    id: new FormControl(),
    code: new FormControl(),
    dateIn: new FormControl(),
    dateOut: new FormControl(),
    status: new FormControl(1),
    weight: new FormControl(),
    isDeleted: new FormControl(),
    pigsty: new FormGroup({
      id: new FormControl()
    })
  });

  constructor(private pigService: PigService,
              private pigstyService: PigstyService,
              private toast: ToastrService,
              private router: Router) {
  }

  getAllPigsty() {
    this.pigstyService.getAll().subscribe(value => {
      this.pigsty = value;
      console.log(value);
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
    this.router.navigateByUrl('/page');
  }

  submitCreate() {
    const pig = this.formPig.value;
    console.log(pig);
    for (const i of this.pigsty) {
      if (i.id === pig.pigsty.id) {
        pig.pigsty.code = i.code;
        break;
      }
    }
    this.pigService.createPig(this.formPig.value).subscribe(value => {
      this.toast.success('Thêm mới thành công!');
      this.router.navigateByUrl('/page');
    });
  }

}
