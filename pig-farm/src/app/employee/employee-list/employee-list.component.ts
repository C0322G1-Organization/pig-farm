import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {EmployeeDto} from "../../model/employeeDto";
import {ToastrService} from "ngx-toastr";
import {EmployeeService} from "../employee.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList: EmployeeDto[] = [];

  // Modal delete
  codeModal: string;
  nameModal: string;
  idModal: number;

  // search
  nameSearch = new FormControl('');
  idCardSearch = new FormControl('');

  // pagination
  indexPagination = 0;
  pages: Array<number>;
  previousPageClass = 'inline-block';
  nextPageClass = 'inline-block';

  // Modal detail
  employeeDetail: EmployeeDto = {};

  constructor(private employeeService: EmployeeService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getListBySearchAndPagination();
  }

  getListBySearchAndPagination() {
    this.employeeService.getListEmployeeBySearchAndPagination(this.nameSearch.value, this.idCardSearch.value,
      this.indexPagination).subscribe(data => {
      if (data === null) {
        this.pages = new Array(0);
        this.employeeList = [];
        this.toast.warning("Không có dữ liệu.","Thông báo")
      } else {
        this.employeeList = data.content;
        this.pages = new Array(data.totalPages);
      }
      this.checkPreviousAndNext();
    })
  }

  previousPage(event: any) {
    event.preventDefault();
    this.indexPagination--;
    this.checkPreviousAndNext();
    this.ngOnInit();
  }

  setPage(i: number, event: any) {
    event.preventDefault();
    this.indexPagination = i;
    this.checkPreviousAndNext();
    this.getListBySearchAndPagination();
  }

  nextPage(event: any) {
    event.preventDefault();
    this.indexPagination++
    this.checkPreviousAndNext()
    this.ngOnInit();
  }

  //kiem tra hien thi nut tiep theo va truoc
  checkPreviousAndNext() {
    if (this.indexPagination == 0) {
      this.previousPageClass = 'none';
    } else if (this.indexPagination != 0) {
      this.previousPageClass = 'inline-block';
    }

    if (this.indexPagination < (this.pages.length - 1)) {
      this.nextPageClass = 'inline-block';
    } else if (this.indexPagination == (this.pages.length - 1) || this.indexPagination > (this.pages.length - 1)) {
      this.nextPageClass = 'none';
    }

  }

  getEmployeeById(id: number) {
    this.employeeService.getEmployeeById(id).subscribe(data => {
      this.employeeDetail = data;
    })
  }

  searchEmployee() {
    this.indexPagination = 0;
    this.getListBySearchAndPagination();
  }

  getModal(id: number, code: string, name: string) {
    this.codeModal = code;
    this.nameModal = name;
    this.idModal = id;
  }

  deleteEmployee() {
    if (this.employeeList.length === 1 && this.indexPagination != 0) {
      this.indexPagination = this.indexPagination - 1;
    }
    this.employeeService.deleteEmployee(this.idModal).subscribe(() => {
    }, error => {
      console.log(error);
    }, () => {
      this.toast.success("Xóa thành công", "Thông báo")
      this.ngOnInit();
    });
  }

}
