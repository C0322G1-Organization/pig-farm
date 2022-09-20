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
  checkPrevious: boolean;
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
              private router: Router,
              private toast: ToastrService,
              private title1: Title) {
    this.title1.setTitle('Cá thể');
  }

  ngOnInit(): void {
    this.getList();
    this.searchForm = new FormGroup({
      codeSearch: new FormControl(''),
      dateInSearch: new FormControl(''),
      statusSearch: new FormControl(''),
    });
  }

  getList() {
    this.pigService.getAllPig(this.indexPagination, this.codeSearch, this. dateInSearch, this.statusSearch, this.pageSize).subscribe((data?: any) => {
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
      }
    );
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

  search() {
    this.codeSearch = this.searchForm.value.content;
    this.dateInSearch = this.searchForm.value.content;
    this.statusSearch = this.searchForm.value.content;

    if (this.checkRegex(this.codeSearch, this.statusSearch)) {
      this.indexPagination = 0;
      this.totalPage = new Array(0);
      this.pigs = [];
      this.displayPagination = 'none';
      this.checkPreviousAndNext();
      this.toast.warning('Không được nhập kí tự đặc biệt.', 'Chú ý');
    } else {
      this.indexPagination = 0;
      this.displayPagination = 'inline-block';
      this.ngOnInit();
    }
  }

  totalElement($event: any) {
    this.deleteList = [];
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
      case 'full':
        this.pageSize = this.totalElements;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
    }
  }

  deleteId() {
    if (this.ids.length > 0) {
      this.pigService.deletePig(this.ids).subscribe(value1 => {
        this.codeSearch = '';
        this.dateInSearch = '';
        this.statusSearch = '';
        this.getList();
        this.toast.success('Xóa thành công ', 'Thông báo');
      }, err => {
        this.clss = 'rd';
        this.msg = 'Có sự cố khi xóa cá thể';
      });
    } else {
      this.clss = 'rd';
      this.msg = 'Bạn phải chọn cá thể mới thực hiện được chức năng này';
      this.toast.error('Bạn phải chọn mục để xóa !!!', 'Thông báo');
    }
    this.deleteList = [];
    this.ids = [];
  }

  getListDelete(pig: Pig) {
    this.pigDeleted = this.deleteList.find(value => value.id === pig.id);
    if (this.pigDeleted) {
      this.deleteList = this.deleteList.filter(value => value.id !== this.pigDeleted.id);
    } else {
      this.deleteList.push(pig);
    }
    for (let i = 0; i < this.deleteList.length; i++) {
      if (!this.ids.includes(this.deleteList[i].id)) {
        this.ids.push(this.deleteList[i].id);
      } else {
        this.ids.splice(i, 1);
        this.ids.push(this.deleteList[i].id);
      }
    }
    this.isCheckedAll();
  }

  isCheckedAll() {
    const listDeleted = this.deleteList.filter((item) => this.pigs.some(item2 => item.id === item2.id));
    const lengthDeleted = listDeleted.filter(
      (pig, index) => index === listDeleted.findIndex(
        other => pig.id === other.id
      )).length;
    this.checkedAll = lengthDeleted === this.pigs.length;
  }

  checkAll(event: any) {
    this.checkedAll = event.target.checked;
    if (this.checkedAll) {
      this.pigs.forEach(item => {
        if (!this.deleteList.includes(item)) {
          this.deleteList.push(item);
        }
      });
      for (let i = 0; i <= this.deleteList.length; i++) {
        if (!this.ids.includes(this.deleteList[i].id)) {
          this.ids.push(this.deleteList[i].id);
        } else {
          this.ids.splice(i, 1);
          this.ids.push(this.deleteList[i].id);
        }
      }
    } else {
      this.deleteList = this.deleteList.filter(item => !this.deleteList.some(item2 => item.id === item2.id));
    }
  }

  checkbox(pig: Pig) {
    for (const item of this.deleteList) {
      if (item.id === pig.id) {
        return true;
      }
    }
    return false;
  }

  resetDelete() {
    this.ids = [];
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
      this.toast.warning('Không được nhập kí tự đặc biệt.', 'Chú ý');
    } else {
      this.indexPagination = 0;
      this.displayPagination = 'inline-block';
      this.getList();
    }
  }
}
