import {Component, OnInit} from '@angular/core';
import {Employee} from '../employee';
import {User} from '../../user/user';
import {EmployeeService} from '../employee.service';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  employees: Employee[] = [];

  users: User[] = [];

  constructor(private employeeService: EmployeeService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.employeeService.getAll().subscribe(employee => {
      this.employees = employee;
    });
    this.userService.getAll().subscribe(user => {
      this.users = user;
    });
  }
}
