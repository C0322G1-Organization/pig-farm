import {Component, OnInit} from '@angular/core';
import {Pigsty} from '../../model/pigsty';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {PigstyService} from '../../service/pigsty.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-pigsty-create',
  templateUrl: './pigsty-create.component.html',
  styleUrls: ['./pigsty-create.component.css']
})
export class PigstyCreateComponent implements OnInit {
  pigsty: Pigsty;
  formPigsty: FormGroup;
  now = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  isExitsCode = false;

  constructor(private pigstyService: PigstyService,
              private toastrService: ToastrService,
              private router: Router,
              private datePipe: DatePipe,
              private title: Title) {
    this.title.setTitle('Tạo chuồng nuôi');
  }

  ngOnInit(): void {
    this.getForm();
  }

  getForm() {
    this.formPigsty = new FormGroup({
      id: new FormControl(),
      buildDate: new FormControl(),
      code: new FormControl('', [Validators.required, Validators.pattern('^C\\d{3}$')]),
      creationDate: new FormControl(this.now, [Validators.required]),
      isDeleted: new FormControl(),
      maxNumber: new FormControl('', [Validators.required, Validators.min(1), Validators.max(20)]),
      typePigs: new FormControl('', [Validators.required]),
      employee: new FormControl(),
    });
    console.log(this.now);
  }

  createPigsty() {
    this.pigstyService.createPigsty(this.formPigsty.value).subscribe(data => {

      }, error => {
      },
      () => {
        this.router.navigateByUrl('/pigsty/list').then(next => this.toastrService.success('Thêm mới thành công'));
      });
  }
  resetPigsty() {
    this.formPigsty = new FormGroup({
      id: new FormControl(),
      buildDate: new FormControl(),
      code: new FormControl('', [Validators.required, Validators.pattern('^C\\d{3}$')]),
      creationDate: new FormControl('', [Validators.required]),
      isDeleted: new FormControl(),
      maxNumber: new FormControl('', [Validators.required, Validators.min(1), Validators.max(20)]),
      typePigs: new FormControl('', [Validators.required]),
      employee: new FormControl(),
    });
  }

  checkCode($event: Event) {
    this.pigstyService.checkCode(String($event)).subscribe(value => {
        if (value) {
          this.isExitsCode = true;
        } else {
          this.isExitsCode = false;
        }
      }
    );
  }
}
