import { Component, OnInit } from '@angular/core';
import {Export} from '../../model/export';
import {FormControl, FormGroup} from '@angular/forms';
import {ExportService} from '../../service/export.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-export-list',
  templateUrl: './export-list.component.html',
  styleUrls: ['./export-list.component.css']
})
export class ExportListComponent implements OnInit {
  listExport: Export[] = [];
  searchForm: FormGroup = new FormGroup({
    codeExport: new FormControl(''),
    companySearch: new FormControl(''),
    employeeSearch: new FormControl('')
  });
  ids: number[];
  nameDelete: any = [];
  error: string;
  check: string[] = [];
  editId: string;
  number: number;
  checkNext: boolean;
  checkPreview: boolean;
  codeExport = '';
  companySearch = '';
  employeeSearch = '';

  constructor(private exportService: ExportService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getListExport(0, '', '', '');
  }

  getListExport(page: number, codeExport: string, company: string, nameEmployee: string) {
    this.exportService.getAll(page, codeExport.trim(), company.trim(), nameEmployee.trim()).subscribe(value => {
      if (value == null) {
        this.listExport = [];
      } else {
        this.number = value?.number;
        this.listExport = value?.content;
        this.checkNext = !value.last;
        this.checkPreview = !value.first;
      }
    }, error1 => {
      this.toast.warning('Dữ liệu không tìm thấy.', 'Chú ý', {
        timeOut: 2500, progressBar: false
      });
    });
  }

  goPrevious() {
    this.number--;
    this.getListExport(this.number, this.codeExport, this.companySearch, this.employeeSearch);
  }

  goNext() {
    this.number++;
    this.getListExport(this.number, this.codeExport, this.companySearch, this.employeeSearch);
  }

  searchExport() {
    this.codeExport = this.searchForm.value.codeExport;
    this.companySearch = this.searchForm.value.companySearch;
    this.employeeSearch = this.searchForm.value.employeeSearch;
    if (this.checkRegex(this.codeExport, this.companySearch, this.employeeSearch)) {
      this.number = 0;
      this.listExport = [];
    } else {
      this.getListExport(0, this.codeExport, this.companySearch, this.employeeSearch);
    }
  }

  checkDelete(value: any) {
    this.ids = [];
    this.nameDelete = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listExport.length; i++) {
      if (value[this.listExport[i].id] === true) {
        this.ids.push(this.listExport[i].id);
        this.nameDelete.push(this.listExport[i].codeExport);
      }
    }
    this.exportService.getAll(0, '', '', '').subscribe(() => {
    });
  }

  resetId() {
    this.nameDelete = [];
    this.ids = [];
    this.ngOnInit();
    this.check = [];
    this.toast.error('Đã hủy yêu cầu xóa.', 'Chú ý', {
      timeOut: 2500, progressBar: false
    });
  }

  deleteId() {
    this.check = [];
    if (this.ids.length > 0) {
      this.exportService.deleteExport(this.ids).subscribe(value1 => {
        this.getListExport(0, '', '', '');
        this.toast.success('Xóa thành công.', 'Thông báo', {
          timeOut: 2500, progressBar: false
        });
        this.ids = [];
      }, err => {
        this.toast.error('Đã xảy ra lỗi.', 'Chú ý', {
          timeOut: 2500, progressBar: false
        });
      });
    } else {
      this.toast.error('Đã hủy yêu cầu xóa.', 'Chú ý', {
        timeOut: 2500, progressBar: false
      });
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

  // kiểm tra nhập kí tự đặc biệt trên ô tìm kiếm.
  checkRegex(codeExport: string, company: string, nameEmployee: string): boolean {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(codeExport) || format.test(company) || format.test(nameEmployee);
  }
}
