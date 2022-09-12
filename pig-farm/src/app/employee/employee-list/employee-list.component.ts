import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../model/employee.service";
import {FormControl} from "@angular/forms";
import {Employee} from "../../model/employee";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList: Employee[] = [];

  // Modal
  codeModal: string;
  nameModal: string;
  idModal: number;

  // search
  nameSearch = new FormControl('');
  idCardSearch = new FormControl('');

  // pagination
  indexPagination = 0;
  pages: Array<number>;
  totalPagination: number;
  previousPageClass = '';
  nextPageClass = '';

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getListBySearchAndPagination();
  }

  getListBySearchAndPagination() {
    if (this.employeeList.length === 0) {
      if (this.indexPagination === 0) {

      } else {
        this.indexPagination = this.indexPagination - 1;
        console.log('OK');
      }
    }
    this.employeeService.getListEmployeeBySearchAndPagination(this.nameSearch.value, this.idCardSearch.value,
      this.indexPagination).subscribe(data => {
      console.log(data);
      if (data === null) {
        this.employeeList = [];
        console.log(this.employeeList.length);
      } else {
        console.log(data);
        this.employeeList = data.content;
        this.pages = new Array(data.totalPages);
        console.log(this.employeeList.length);
      }
    });
  }

  previousPage() {

  }

  nextPage() {

  }

  searchEmployee() {

  }

  setPage(i: number, event: any) {
    event.preventDefault();
    this.indexPagination = i;
    this.getListBySearchAndPagination();
  }

  getModal(id: number, code: string, name: string) {
    this.codeModal = code;
    this.nameModal = name;
    this.idModal = id;
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.idModal).subscribe(() => {
    }, error => {
      console.log(error);
    }, () => {
      this.ngOnInit();
    });
  }

}
