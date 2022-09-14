import {Component, OnInit} from '@angular/core';
import {Vaccination} from '../../model/vaccination';
import {FormControl, FormGroup} from '@angular/forms';
import {VaccinationService} from '../../service/vaccination.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vaccination-list',
  templateUrl: './vaccination-list.component.html',
  styleUrls: ['./vaccination-list.component.css']
})
export class VaccinationListComponent implements OnInit {
  vaccins: Vaccination[] = [];
  number: number;
  msg: string;
  clss: string;
  nameDelete: any = [];
  ids: number[] = [];
  checkNext: boolean;
  checkPrevious: boolean;
  nameContent = '';

  searchForm: FormGroup = new FormGroup({
    vaccinPerson: new FormControl('')
  });


  constructor(private vaccinService: VaccinationService,
              private router: Router,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getAll(0, '');
  }

  getAll(page: number, name: string) {
    this.vaccinService.findAll(page, name).subscribe((value: any) => {
      this.number = value?.number;
      this.vaccins = value?.content;
      console.log(value?.content);
      this.checkNext = !value.last;
      this.checkPrevious = !value.first;
    }, error => {
      console.log(error);
    });
  }

  goPrevious() {
    this.number--;
    this.getAll(this.number, this.nameContent);
  }

  goNext() {
    this.number++;
    this.getAll(this.number, this.nameContent);
  }

  searchVaccin() {
    this.nameContent = this.searchForm.value.vaccinPerson;
    this.getAll(0, this.nameContent);
  }

  deleteId() {
    if (this.ids.length > 0) {
      this.vaccinService.deleteVaccination(this.ids).subscribe(value1 => {
        this.getAll(0, '');
        this.toast.success('Xóa thành công !!!', 'Thông báo');
        this.ids = [];
      }, err => {
        this.clss = 'rd';
        this.msg = 'Có sự cố khi xóa thông báo';
      });
    } else {
      this.clss = 'rd';
      this.msg = 'Bạn phải chọn mới có thể tiến hành xoá';
    }
    this.nameDelete = [];
  }

  checkDelete(value: any) {
    this.ids = [];
    this.msg = '';
    this.nameDelete = [];
    this.vaccins.forEach(item => {
      if (value[item.id] === true) {
        this.ids.push(item.id);
        this.nameDelete.push(item.vaccinatedPerson);
      }
    });
    this.vaccinService.findAll(0, '').subscribe(() => {
    });
  }

  resetDelete() {
    this.nameDelete = [];
    this.ids = [];
  }
}
