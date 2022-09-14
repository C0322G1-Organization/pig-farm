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
  checkNext: boolean;
  checkPrevious: boolean;
  previousPageClass: any;
  pages: any;
  nextPageClass: any;
  checkPreview: boolean;
  dateInSearch: string;
  statusSearch: string;

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

  // getAllPig(page: number) {
  //   this.pigService.findAllPig(page).subscribe((data: any) => {
  //     this.totalPages = data?.totalPages;
  //     this.countTotalPages = new Array(data?.totalPages);
  //     this.number = data?.number;
  //     this.pigs = data?.content;
  //     this.checkNext = !data.last;
  //     this.checkPrevious = !data.first;
  //     this.msg = '';
  //   });
  // }

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
  // getAll(page: number) {
  //   this.searchForm = new FormGroup({
  //     codeSearch: new FormControl(''),
  //     dateInSearch: new FormControl(''),
  //     statusSearch: new FormControl(''),
  //     content: new FormControl('')
  //   });
  //   if (this.codeSearch === undefined) {
  //     this.codeSearch = '';
  //   }
  //   if (this.dateInSearch === undefined) {
  //     this.dateInSearch = '';
  //   }
  //   if (this.statusSearch === undefined) {
  //     this.statusSearch = '';
  //   }
  //   console.log('---------' + this.codeSearch);
  //   this.pigService.getAllPig(page, this.codeSearch, this.dateInSearch, this.statusSearch).subscribe((data?: any) => {
  //     if (data?.content.length < 1) {
  //       return this.toastrService.success('Không tìm thấy !!!', 'Cá thể');
  //     }
  //     this.number = data?.number;
  //     this.checkNext = !data.last;
  //     this.checkPreview = !data.first;
  //     this.pigs = data?.content;
  //     console.log(data);
  //   }, error => {
  //     console.log(error);
  //   }, () => {
  //     console.log('get all ok');
  //   });
  // }
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
}
