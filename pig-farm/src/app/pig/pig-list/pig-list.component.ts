import { Component, OnInit } from '@angular/core';
import {Pig} from '../../model/pig';
import {FormControl, FormGroup} from '@angular/forms';
import {PigService} from '../../service/pig.service';
import {ToastrService} from 'ngx-toastr';
const URL_PIG = 'http://localhost:8080/pig';
@Component({
  selector: 'app-pig-list',
  templateUrl: './pig-list.component.html',
  styleUrls: ['./pig-list.component.css']
})
export class PigListComponent implements OnInit {

  pigs: Pig[] = [];
  code: string;
  dateIn: string;
  status: string;
  codeSearch: string;
  page = 0;
  searchForm: FormGroup;
  totalPages: number;
  number: number;
  countTotalPages: number[];
  idDelete: number;
  formCheckBox: FormGroup;
  nameDelete: any = [];
  ids: number[] = [];
  msg: string;
  clss: string;
  content: string;
  checkNext: boolean;
  previousPageClass: any;
  pages: any;
  nextPageClass: any;
  dateInSearch: string;
  statusSearch: string;
  check: string[] = [];
  editId: string;
  informationDelete: Pig[];

  constructor(private pigService: PigService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getPigPage(0, '', '', '');
    console.log(this.ids.length);
    // this.getAll(0);
    this.searchForm = new FormGroup({
      codeSearch: new FormControl(''),
      dateInSearch: new FormControl(''),
      statusSearch: new FormControl(''),
    });
  }

  getPigPage(page: number, codeSearch: string, dateInSearch: string, statusSearch: string) {
    this.pigService.getAllPig(page, codeSearch, dateInSearch, statusSearch).subscribe((data: Pig[]) => {
      if (data !== null) {
        // @ts-ignore
        this.totalPages = data.totalPages;
        // @ts-ignore
        this.countTotalPages = new Array(data.totalPages);
        // @ts-ignore
        this.number = data.number;
        // @ts-ignore
        this.pigs = data.content;
        // @ts-ignore
        this.size = data.size;
      } else {
        this.pigs = [];
      }
    }, error => {
      console.log(error);
    });
  }

  searchPig() {
    this.getPigPage(0,
      this.searchForm.value.codeSearch,
      this.searchForm.value.dateInSearch,
      this.searchForm.value.statusSearch);
  }

  goPrevious() {
    let numberPage: number = this.number;
    if (numberPage > 0) {
      numberPage--;
      this.getPigPage(numberPage, this.searchForm.value.codeSearch,
        this.searchForm.value.dateInSearch,
        this.searchForm.value.statusSearch);
    }
  }

  goNext() {
    let numberPage: number = this.number;
    if (numberPage < this.totalPages - 1) {
      numberPage++;
      this.getPigPage(numberPage, this.searchForm.value.codeSearch,
        this.searchForm.value.dateInSearch,
        this.searchForm.value.statusSearch);
    }
  }

  goItem(i: number) {
    this.getPigPage(i, this.searchForm.value.codeSearch,
      this.searchForm.value.dateInSearch,
      this.searchForm.value.statusSearch);
  }

  goStart() {
    this.getPigPage(0, this.searchForm.value.codeSearch,
      this.searchForm.value.dateInSearch,
      this.searchForm.value.statusSearch);
  }
  goEnd() {
    this.getPigPage(this.totalPages - 1, this.searchForm.value.codeSearch,
      this.searchForm.value.dateInSearch,
      this.searchForm.value.statusSearch);
  }

  resetDelete() {
    this.nameDelete = [];
    this.ids = [];
  }

  deleteId() {
    if (this.ids.length > 0) {
      this.pigService.deletePig(this.ids).subscribe(value1 => {
        this.getPigPage(0, '', '', '');
        this.toastrService.error('Xóa thành công !!!', 'Thông báo');
        this.ids = [];
      }, err => {
        this.clss = 'rd';
        this.msg = 'Có sự cố khi xóa cá thể';
      });
    } else {
      this.clss = 'rd';
      this.msg = 'Bạn phải chọn cá thể mới thực hiện được chức năng này';
      this.toastrService.error('Bạn phải chọn mục để xóa !!!', 'Cá thể');
    }
    this.nameDelete = [];
  }

  checkDelete(value: any) {
    this.ids = [];
    this.msg = '';
    this.nameDelete = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.pigs.length; i++) {
      if (value[this.pigs[i].id] === true) {
        this.ids.push(this.pigs[i].id);
        this.nameDelete.push(this.pigs[i].code);
      }
    }
    this.pigService.getAllPig(0, '', '', '').subscribe(() => {
    });
  }

  checkButton(value: any) {
    this.msg = '';
    if (this.check.includes(value)) {
      this.check.filter(item => item !== value);
      for (let i = 0; i < this.check.length; i++) {
        if (this.check[i] === value) {
          this.check.splice(i, 1);
        }
      }
    } else {
      this.check.push(value);
    }
    if (this.check.length > 1) {
      this.editId = null;
    } else {
      this.editId = this.check[0];
    }
  }

  getListDelete(pigDelete: Pig) {
    for (let i = 0; i < this.nameDelete.length; i++) {
      if (this.nameDelete[i].id === pigDelete.id) {
        this.nameDelete.splice(i, 1);
        return;
      }
    }
    this.nameDelete.push(pigDelete);
    this.ids = [];
    this.informationDelete = [];
    for (const item of this.nameDelete) {
      this.ids.push(item.id);
      this.informationDelete.push(item.title);
    }
  }

  checkbox(pigDelete: Pig) {
    for (const item of this.nameDelete) {
      if (item.id === pigDelete.id) {
        return true;
      }
    }
    return false;
  }

}
