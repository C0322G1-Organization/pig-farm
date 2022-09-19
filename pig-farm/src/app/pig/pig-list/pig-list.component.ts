import {Component, OnInit} from '@angular/core';
import {Pig} from '../../model/pig';
import {FormControl, FormGroup} from '@angular/forms';
import {PigService} from '../../service/pig.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

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
  page = 0;
  searchForm: FormGroup;
  totalPages: number;
  number: number;
  countTotalPages: number[];
  idDelete: number;
  formCheckBox: FormGroup;
  nameDelete: Pig[] = [];
  ids: number[] = [];
  msg: string;
  clss: string;
  content: string;
  previousPageClass: any;
  nextPageClass: any;
  dateInSearch = '';
  statusSearch = '';
  codeSearch = '';
  check: string[] = [];
  editId: string;
  deleteList: Pig[] = [];
  checkNext: boolean;
  totalPage: Array<number>;
  indexPagination = 0;
  pages: Array<number>;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  totalElements = 0;
  pageSize = 5;
  displayPagination = 'inline-block';
  numberOfElement = 0;
  checkedAll = false;
  pigDeleted: Pig;

  constructor(private pigService: PigService,
              private toastrService: ToastrService,
              private router: Router,
              private title: Title) {
    this.title.setTitle('Cá thể');
  }

  ngOnInit(): void {
    console.log(this.ids.length);
    this.getList();
    this.searchForm = new FormGroup({
      codeSearch: new FormControl(''),
      dateInSearch: new FormControl(''),
      statusSearch: new FormControl(''),
    });
  }

  getList() {
    this.pigService.getAllPig(this.indexPagination, this.codeSearch, this.dateInSearch, this.statusSearch, this.pageSize).subscribe((data?: any) => {
      if (data === null) {
        this.totalPage = new Array(0);
        this.pigs = [];
        this.displayPagination = 'none';
      } else {
        this.number = data?.number;
        this.pageSize = data?.size;
        this.numberOfElement = data?.numberOfElements;
        this.pigs = data.content;
        this.totalElements = data?.totalElements;
        this.totalPage = new Array(data?.totalPages);
      }
      this.checkPreviousAndNext();
      this.isCheckedAll();
    }, error => {
      this.pigs = null;
    });
  }

  previousPage(event: any) {
    event.preventDefault();
    this.indexPagination--;
    this.ngOnInit();
  }

  nextPage(event: any) {
    event.preventDefault();
    this.indexPagination++;
    this.ngOnInit();
  }

  checkPreviousAndNext() {
    if (this.indexPagination === 0) {
      this.previousPageStyle = 'none';
    } else if (this.indexPagination !== 0) {
      this.previousPageStyle = 'inline-block';
    }
    if (this.indexPagination < (this.totalPage.length - 1)) {
      this.nextPageStyle = 'inline-block';
    } else if (this.indexPagination === (this.totalPage.length - 1) || this.indexPagination > (this.totalPage.length - 1)) {
      this.nextPageStyle = 'none';
    }
  }

  checkRegex(codeSearch: string, statusSearch: string): boolean {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(codeSearch) || format.test(statusSearch);
  }

  searchPig() {
    this.codeSearch = this.searchForm.value.codeSearch;
    this.dateInSearch = this.searchForm.value.dateInSearch;
    this.statusSearch = this.searchForm.value.statusSearch;
    if (this.checkRegex(this.searchForm.value.codeSearch, this.searchForm.value.statusSearch)) {
      this.indexPagination = 0;
      this.totalPage = new Array(0);
      this.pigs = [];
      this.displayPagination = 'none';
      this.checkPreviousAndNext();
      this.toastrService.warning('Không được nhập kí tự đặc biệt.', 'Chú ý');
    } else {
      this.indexPagination = 0;
      this.displayPagination = 'inline-block';
      this.getList();
    }
  }

  totalElement($event: any) {
    this.nameDelete = [];
    this.isCheckedAll();
    switch ($event.target.value) {
      case '5':
        this.pageSize = 5;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case '10':
        this.pageSize = 10;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case '15':
        this.pageSize = 15;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case 'full list':
        this.pageSize = this.totalElements;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
    }
  }

  resetDelete() {
    this.nameDelete = [];
    this.ids = [];
  }

  deleteId() {
    const id: number[] = [];
    for (const argument of this.nameDelete) {
      id.push(argument.id);
    }
    if (id.length > 0) {
      this.pigService.deletePig(id).subscribe(value1 => {
        this.indexPagination = 0;
        this.getList();
        this.toastrService.success('Xóa thành công !!!', 'Thông báo');
        this.nameDelete = [];
      }, err => {
        this.clss = 'rd';
        this.msg = 'Có sự cố khi xóa cá thể';
      });
    } else {
      this.clss = 'rd';
      this.msg = 'Bạn phải chọn cá thể mới thực hiện được chức năng này';
      this.toastrService.error('Bạn phải chọn mục để xóa !!!', 'Thông báo');
    }
    this.nameDelete = [];
  }

  edit() {
    if (this.deleteList.length === 1) {
      this.router.navigateByUrl('pig/update/' + this.deleteList[0]).then(r => console.log(r));
    }
  }
  checkAll(event: any) {
    this.checkedAll = event.target.checked;
    if (this.checkedAll) {
      this.pigs.forEach(item => {
        this.nameDelete.push(item);
      });
    } else {
      this.nameDelete = this.nameDelete.filter(item => !this.pigs.some(item2 => item.id === item2.id));
    }
  }

  isCheckedAll() {
    const listDeleted = this.nameDelete.filter((item) => this.pigs.some(item2 => item.id === item2.id));
    const lengthDeleted = listDeleted.filter(
      (pig, index) => index === listDeleted.findIndex(
        other => pig.id === other.id
      )).length;
    this.checkedAll = lengthDeleted === this.pigs.length;
  }

  checkbox(pig: Pig) {
    for (const item of this.nameDelete) {
      if (item.id === pig.id) {
        return true;
      }
    }
    return false;
  }

  checkList(pig: Pig) {
    this.pigDeleted = this.nameDelete.find(deleteObject => deleteObject.id === pig.id);
    if (this.pigDeleted) {
      this.nameDelete = this.nameDelete.filter(contactDelete => contactDelete.id !== this.pigDeleted.id);
    } else {
      this.nameDelete.push(pig);
    }

    this.isCheckedAll();
  }
}
