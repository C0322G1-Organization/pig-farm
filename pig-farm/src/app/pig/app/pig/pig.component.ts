import {Component, OnInit, SimpleChanges} from '@angular/core';
import {FormGroup, FormControl, FormArray} from '@angular/forms';
import {PigService} from '../service/pig.service';
import {Pig} from '../model/pig';
import {ToastrService} from 'ngx-toastr';

const URL_PIG = 'http://localhost:8080/pig';

@Component({
  selector: 'app-pig',
  templateUrl: './pig.component.html',
  styleUrls: ['./pig.component.css']
})
export class PigComponent implements OnInit {

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

  constructor(private pigService: PigService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    console.log(this.ids.length);
    this.getAllPig(0);
    this.searchForm = new FormGroup({
      codeSearch: new FormControl(''),
      dateInSearch: new FormControl(''),
      statusSearch: new FormControl(''),
      content: new FormControl('')
    });
  }

  getAllPig(page: number) {
    this.pigService.findAllPig(page).subscribe((data: any) => {
      this.totalPages = data?.totalPages;
      this.countTotalPages = new Array(data?.totalPages);
      this.number = data?.number;
      this.pigs = data?.content;
      this.msg = '';
    });
  }
  searchPig() {
    this.pigService.searchPig(this.searchForm.value).subscribe((value: Pig[]) => {
      // @ts-ignore
      this.pigs = value.content;
    });
  }
  goPrevious() {
    let numberPage: number = this.number;
    if (numberPage > 0) {
      numberPage--;
      this.getAllPig(numberPage);
    }
  }

  goNext() {
    let numberPage: number = this.number;
    if (numberPage < this.totalPages - 1) {
      numberPage++;
      this.getAllPig(numberPage);
    }
  }

  goItem(i: number) {
    this.getAllPig(i);
  }

  resetDelete() {
    this.nameDelete = [];
    this.ids = [];
  }

  deleteId() {
    if (this.ids.length > 0) {
      this.pigService.deletePig(this.ids).subscribe(value1 => {
        this.getAllPig(0);
        this.toastrService.error('Xóa thành công !!!', 'Cá thể');
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
    this.nameDelete = [];
    for (const valueElement of this.pigs) {
      if (value[valueElement.id] === true) {
        this.ids.push(valueElement.id);
      }
    }
    // tslint:disable-next-line:no-shadowed-variable
    this.pigService.findAllPig(0).subscribe((value: any) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.ids.length; i++) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < value?.content.length; j++) {
          if (this.ids.includes(this.ids[i]) && this.ids[i] === value?.content[j].id) {
            this.nameDelete.splice(i, 1);
            this.nameDelete.push(value?.content[j].code);
          }
        }
      }
    });
  }
}
