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

  searchExport() {
    // tao const ojb de hung gia tri tu form
    const obj = {
      codeExportSearch: this.searchForm.value.codeExport,
      companySearch: this.searchForm.value.company,
      nameSearch: this.searchForm.value.nameEmployee,
    };
    console.log(this.searchForm.value.titleSearch);
    this.exportService.searchAdvertisement(obj).subscribe((value: Export[]) => {
      // @ts-ignore
      this.listExport = value.content;
    }, error => {
      console.log(error);
    });
  }

  getListExport(page: number) {
    // @ts-ignore
    // tslint:disable-next-line:variable-name
    this.exportService.getAll(page).subscribe((value: any) => {
      this.totalPages = value?.totalPages;
      this.countTotalPages = new Array(value?.totalPages);
      this.number = value?.number;
      this.listExport = value?.content;
      console.log(value?.content);
    }, error => {
      console.log(error);
    });
  }

  goPrevious() {
    let numberPage: number = this.number;
    if (numberPage > 0) {
      numberPage--;
      this.getListExport(numberPage);
    }
  }

  goNext() {
    let numberPage: number = this.number;
    if (numberPage < this.totalPages - 1) {
      numberPage++;
      this.getListExport(numberPage);
    }
  }

  goItem(i: number) {
    this.getListExport(i);
  }

  checkDelete(value: any) {
    console.log(1);
    this.ids = [];
    for (const valueElement of this.listExport) {
      if (value[valueElement.id] === true) {
        this.ids.push(valueElement.id);
      }
    }
    console.log(this.ids);
    // tslint:disable-next-line:no-shadowed-variable
    this.exportService.getAll(0).subscribe((value: any) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.ids.length; i++) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < value?.content.length; j++) {
          if (this.ids.includes(this.ids[i]) && this.ids[i] === value?.content[j].id) {
            this.nameDelete.splice(i, 1);
            this.nameDelete.push(value?.content[j].codeExport);
            console.log(this.nameDelete);
          }
        }
      }
    });
    console.log(this.nameDelete);
  }

  resetId() {
    this.nameDelete = [];
    this.ids = [];
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
    this.mess = '';
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


}
