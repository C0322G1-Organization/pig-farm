import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Pigsty} from '../../model/pigsty';
import {PigService} from '../../service/pig.service';
import {PigstyService} from '../../service/pigsty.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-pig',
  templateUrl: './update-pig.component.html',
  styleUrls: ['./update-pig.component.css']
})
export class UpdatePigComponent implements OnInit {
  id: number;
  pigsty: Pigsty[];
  formEditPig = new FormGroup({
    id: new FormControl(),
    code: new FormControl(''),
    dateIn: new FormControl(''),
    dateOut: new FormControl(),
    status: new FormControl(''),
    weight: new FormControl(''),
    isDeleted: new FormControl(''),
    pigsty: new FormGroup({
      id: new FormControl('')
    })
  });
  constructor(private pigService: PigService,
              private pigstyService: PigstyService,
              private toast: ToastrService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.getAllPigsty();
    this.findById(this.id);
  }
  getAllPigsty() {
    this.pigstyService.getAll().subscribe(value => {
      this.pigsty = value;
      console.log(value);
    });
  }
  findById(id) {
    this.pigService.findById(id).subscribe(value => {
      this.formEditPig.patchValue(value);
      console.log(value);
    }, error => {
      this.router.navigateByUrl('/500');
    });
  }
  cancel() {
    this.toast.error('Sửa thất bại');
    this.router.navigateByUrl('/pig');
  }
  submit() {
    this.pigService.updateComputer(this.id, this.formEditPig.value).subscribe(value => {
        this.toast.success('Sửa thành công');
        this.router.navigateByUrl('/pig');
      },
      error => {
        this.toast.error('Sửa thất bại');
      });
  }

}
