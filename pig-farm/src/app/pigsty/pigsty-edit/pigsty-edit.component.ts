import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Pigsty} from '../../model/pigsty';
import {PigstyService} from '../../service/pigsty.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-pigsty-edit',
  templateUrl: './pigsty-edit.component.html',
  styleUrls: ['./pigsty-edit.component.css']
})
export class PigstyEditComponent implements OnInit {
  formPigstyEdit: FormGroup;
  pigsty: Pigsty;

  constructor(private pigstyService: PigstyService,
              private router: Router,
              private toastrService: ToastrService,
              private activatedRoute: ActivatedRoute) {
  }

  getParamId() {
    this.activatedRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      console.log(id);
      this.pigstyService.getPigsty(+id).subscribe(data => {
        this.pigsty = data;
        if (data == null) {
          this.toastrService.error('Không có dữ liệu hoặc bạn đang nhập quá dữ liệu hiện có', 'Thông Báo');
          this.router.navigateByUrl('/pigsty-list').then();
        }
        this.getFormEdit();
      });
    });
  }

  ngOnInit(): void {
    this.getParamId();
  }

  getFormEdit() {
    this.formPigstyEdit = new FormGroup({
      id: new FormControl(this.pigsty.id),
      buildDate: new FormControl(this.pigsty.buildDate),
      code: new FormControl(this.pigsty.code, [Validators.required, Validators.pattern('^C\\d{3}$')]),
      creationDate: new FormControl(this.pigsty.creationDate, [Validators.required]),
      isDeleted: new FormControl(this.pigsty.isDeleted),
      maxNumber: new FormControl(this.pigsty.maxNumber, [Validators.required, Validators.min(1), Validators.max(20)]),
      typePigs: new FormControl(this.pigsty.typePigs, [Validators.required]),
      employee: new FormControl(this.pigsty.employee),
    });
  }

  editPigsty() {
    this.pigstyService.editPigsty(this.formPigstyEdit.value).subscribe(data => {

      }, error => {
      },
      () => {
        this.router.navigateByUrl('/pigsty/list').then(next => this.toastrService.success('Chỉnh sửa thành công'));
      });
  }

}
