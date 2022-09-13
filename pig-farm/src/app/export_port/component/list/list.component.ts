import {Component, OnInit} from '@angular/core';
import {ExportService} from '../../service/export.service';
import {Export} from '../../model/export';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listExport: Export[] = [];
  totalPages: number;
  page = 1;
  number: number;
  countTotalPages: number[];
  searchForm: FormGroup = new FormGroup({
    codeExport: new FormControl(''),
    company: new FormControl(''),
    nameEmployee: new FormControl('')
  });
  ids: number[];
  nameDelete: any = [];
  error: string;
  mess: string;
  check: string[] = [];
  editId: string;

  constructor(private exportService: ExportService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getListExport(this.page - 1);
  }

  getListExport(page: number) {
    // @ts-ignore
    this.exportService.getAll(page).subscribe((value?: any) => {
      this.totalPages = value?.totalPages;
      this.countTotalPages = new Array(value?.totalPages);
      this.number = value?.number;
      this.listExport = value?.content;
      console.log(value?.content);
    }, error => {
      console.log(error);
    });
  }

  searchExport() {
    // tao const ojb de hung gia tri tu form
    const obj = {
      codeExportSearch: this.searchForm.value.codeExport,
      companySearch: this.searchForm.value.company,
      nameSearch: this.searchForm.value.nameEmployee,
    };
    console.log(this.searchForm.value.titleSearch);
    this.exportService.searchAdvertisement(obj).subscribe((value?: any) => {
      // @ts-ignore
      this.listExport = value?.content;
      console.log(this.listExport);
    }, error => {
      console.log(error);
    });
  }

  goPrevious() {
    this.check = [];
    let numberPage: number = this.number;
    if (numberPage > 0) {
      numberPage--;
      this.getListExport(numberPage);
    }
  }

  goNext() {
    this.check = [];
    let numberPage: number = this.number;
    if (numberPage < this.totalPages - 1) {
      numberPage++;
      this.getListExport(numberPage);
    }
  }

  goItem(i: number) {
    this.check = [];
    this.getListExport(i);
  }

  checkDelete(value: any) {
    this.ids = [];
    this.nameDelete = [];
    for (let i = 0; i < this.listExport.length; i++) {
      if (value[this.listExport[i].id] === true) {
        this.ids.push(this.listExport[i].id);
        this.nameDelete.push(this.listExport[i].codeExport);
      }
    }
    this.exportService.getAll(0).subscribe((listAds: any) => {
    });
  }

  resetId() {
    this.nameDelete = [];
    this.ids = [];
    this.ngOnInit();
    this.check = [];
  }

  deleteId() {
    this.check = [];
    if (this.ids.length > 0) {
      this.exportService.deleteExport(this.ids).subscribe(value1 => {
        this.getListExport(0);
        this.toast.success('Xóa thành công !!!', 'Thông báo');
        this.ids = [];
      }, err => {
        this.error = 'rd';
        this.mess = 'Có sự cố khi xóa thông báo';
      });
    } else {
      this.error = 'rd';
      this.mess = 'Bạn phải chọn mới có thể tiến hành xoá';
    }
    this.nameDelete = [];
  }

  checkButton(value: any) {
    // tìm trùng lặp trong mảng check
    if (this.check.includes(value)) {
      // lọc những data khác value
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

}
