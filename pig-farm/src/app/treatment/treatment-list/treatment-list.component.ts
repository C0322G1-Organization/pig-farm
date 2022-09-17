import {Component, OnInit} from '@angular/core';
import {Treatment} from '../../model/treatment';
import {TreatmentService} from '../../service/treatment.service';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

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

  totalElements: number;
  pageSize = 5;

  numberOfElementFirst: number;
  numberOfElementFinal: number;

  constructor(private treatmentService: TreatmentService, private toastrService: ToastrService,
              private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Khám chữa bệnh');
    this.getAll(0);
  }

  getAll(page: number) {
    if (this.keySearch === 'null' || this.keySearch === '#') {
      return this.treatmentList.length = 0;
    }
    if (this.keySearch === undefined) {
      this.keySearch = '';
    }
    this.treatmentService.getAll(page, this.keySearch, this.pageSize).subscribe((data?: any) => {
      if (data?.content.length < 1 || data?.content.length === undefined) {
        this.treatmentList.length = 0;
        return;
      }
      this.number = data?.number;
      this.checkNext = !data.last;
      this.checkPreview = !data.first;
      this.treatmentList = data?.content;
      this.totalElements = data?.totalElements;
      this.numberOfElementFinal = 1 + data?.size * data?.number;
      this.numberOfElementFirst = data?.numberOfElements + data?.size * data?.number;
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  delete() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.deleteList.length; i++) {
      this.treatmentService.deleteTreatment(this.deleteList[i].id).subscribe(() => {
        this.toastrService.success('Xóa thành công', 'Thông báo');
        this.deleteList.splice(0, this.deleteList.length);
        this.checkDelete = this.deleteList.length < 1;
        this.ngOnInit();
      }, error => {
        this.toastrService.error('Xóa không thành công !!!', 'Cảnh báo');
        this.deleteList.splice(0, this.deleteList.length);
        console.log('error', error);
      });
    }
  }

  getListDelete(treatment: Treatment) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i].id === treatment.id) {
        this.deleteList.splice(i, 1);
        this.checkDelete = this.deleteList.length < 1;
        return;
      }
    }
    this.deleteList.push(treatment);
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

  // phan trang

  totalElement($event: any) {
    switch ($event.target.value) {
      case '5':
        this.pageSize = 5;
        this.ngOnInit();
        break;
      case '10':
        this.pageSize = 10;
        this.ngOnInit();
        break;
      case '15':
        this.pageSize = 15;
        this.ngOnInit();
        break;
      case 'full':
        this.pageSize = this.totalElements;
        this.ngOnInit();
        break;
    }
  }
}
