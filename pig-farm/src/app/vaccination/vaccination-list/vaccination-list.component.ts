import {Component, OnInit} from '@angular/core';
import {Vaccination} from '../../model/vaccination';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {VaccinationService} from '../../service/vaccination.service';

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
  informationDelete: Vaccination[] = [];

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

  resetDelete() {
    this.nameDelete = [];
    this.ids = [];
  }

  getListDelete(vaccinationDelete: Vaccination) {
    for (let i = 0; i < this.nameDelete.length; i++) {
      if (this.nameDelete[i].id === vaccinationDelete.id) {
        this.nameDelete.splice(i, 1);
        return;
      }
    }
    this.nameDelete.push(vaccinationDelete);
    this.ids = [];
    this.informationDelete = [];
    for (const item of this.nameDelete) {
      this.ids.push(item.id);
      this.informationDelete.push(item.title);
    }
  }

  checkbox(notificationDelete: Vaccination) {
    for (const item of this.nameDelete) {
      if (item.id === notificationDelete.id) {
        return true;
      }
    }
    return false;
  }
}
