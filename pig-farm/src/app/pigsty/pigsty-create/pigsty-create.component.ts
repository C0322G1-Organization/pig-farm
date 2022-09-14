import {Component, OnInit} from '@angular/core';
import {Pigsty} from "../../model/pigsty";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PigstyService} from "../../service/pigsty.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pigsty-create',
  templateUrl: './pigsty-create.component.html',
  styleUrls: ['./pigsty-create.component.css']
})
export class PigstyCreateComponent implements OnInit {
  pigsty: Pigsty;
  formPigsty: FormGroup;

  constructor(private pigstyService: PigstyService,
              private toastrService: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getForm()
  }

  getForm() {
    this.formPigsty = new FormGroup({
      id: new FormControl(),
      buildDate: new FormControl(),
      code: new FormControl('', [Validators.required, Validators.pattern("^C\\d{3}$")]),
      creationDate: new FormControl('', [Validators.required]),
      isDeleted: new FormControl(),
      maxNumber: new FormControl('', [Validators.required,Validators.min(1),Validators.max(20)]),
      typePigs: new FormControl('', [Validators.required]),
      employee: new FormControl(),
    })
    console.log(this.formPigsty)
  }

  createPigsty() {
    this.pigstyService.createPigsty(this.formPigsty.value).subscribe(data => {

      }, error => {
      },
      () => {
        this.router.navigateByUrl('/pigsty-list').then(next => this.toastrService.success('Thêm mới thành công'))
      })
  }
}
