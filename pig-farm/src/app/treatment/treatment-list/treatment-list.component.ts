import {Component, OnInit} from '@angular/core';
import {Treatment} from '../../model/treatment';
import {TreatmentService} from '../../service/treatment.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-treatment-list',
  templateUrl: './treatment-list.component.html',
  styleUrls: ['./treatment-list.component.css']
})
export class TreatmentListComponent implements OnInit {
  treatmentList: Treatment[] = [];
  deleteList: Treatment[] = [];
  keySearch: string;

  checkNext: boolean;
  checkPreview: boolean;
  number: number;
  checkDelete = true;


  constructor(private treatmentService: TreatmentService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getAll(0);
  }

  getAll(page: number) {
    console.log('---------------- ' + this.keySearch);
    if (this.keySearch === undefined) {
      this.keySearch = '';
    }
    this.treatmentService.getAll(page, this.keySearch).subscribe((data?: any) => {
      console.log(data);
      if (data?.content === null) {
        this.keySearch = '';
      }
      if (data?.content.length < 1 || data?.content.length === undefined) {
        this.treatmentList.length = 0;
        return;
      }
      this.number = data?.number;
      this.checkNext = !data.last;
      this.checkPreview = !data.first;
      this.treatmentList = data?.content;
      console.log(data);
    }, error => {
      console.log(error);
    }, () => {
      console.log('get all ok');
    });
  }

  delete() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.deleteList.length; i++) {
      console.log('delete', this.deleteList[i]);
      this.treatmentService.deleteTreatment(this.deleteList[i].id).subscribe(() => {
        this.toastrService.success('Xóa thành công', 'Thông báo');
        this.deleteList.splice(0, this.deleteList.length);
        this.checkDelete = this.deleteList.length < 1;
        this.getAll(0);
      }, error => {
        this.toastrService.error('Xóa không thành công !!!', 'Cảnh báo');
        this.deleteList.splice(0, this.deleteList.length);
        console.log('error', error);
      });
    }
    console.log(this.deleteList);
  }

  getListDelete(treatment: Treatment) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === treatment.id) {
        this.deleteList.splice(i, 1);
        console.log(this.deleteList);
        this.checkDelete = this.deleteList.length < 1;
        return;
      }
    }
    this.deleteList.push(treatment);
    console.log(this.deleteList);
    this.checkDelete = this.deleteList.length < 1;
  }

  goPrevious() {
    this.number--;
    this.getAll(this.number);
  }

  goDesignatedPlace() {
    this.getAll(this.number);
  }

  goNext() {
    this.number++;
    this.getAll(this.number);
  }

  checkbox(treatment: Treatment) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === treatment.id) {
        return true;
      }
    }
    return false;
  }
  checkboxAll() {
  }

  getListDeleteAll() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.treatmentList.length; i++) {
      this.deleteList.push(this.treatmentList[i]);
    }
    this.checkDelete = this.deleteList.length < 1;
  }
}
