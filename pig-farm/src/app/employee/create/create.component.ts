import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../../user/user';
import {EmployeeService} from '../employee.service';
import {UserService} from '../../user/user.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  employeeForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    code: new FormControl(''),
    name: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    birthDay: new FormControl(''),
    gender: new FormControl(''),
    idCard: new FormControl(''),
    image: new FormControl(''),
    isDeleted: new FormControl(0),
    export: new FormControl(''),
    user: new FormControl('')
  });

  users: User[] = [];

  constructor(private employeeService: EmployeeService,
              private userService: UserService,
              private toast: ToastrService,
              private router: Router) {
  }

  getUser(): void {
    this.userService.getAll().subscribe(user => {
      this.users = user;
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  submit(): void {
    const employee = this.employeeForm.value;
    this.userService.findById(employee.user).subscribe(user => {
      employee.user = {
        id: user.id,
        username: user.username,
        password: user.password,
        email: user.email,
        creationDate: user.creationDate
      };
      this.employeeService.saveEmployee(employee).subscribe(() => {
        this.employeeForm.reset();
        this.toast.success('Thêm Mới Nhân Viên Thành Công..', 'Thông Báo');
        this.router.navigate(['/employee']);
      }, error => {
        console.log(error);
      });
    });
  }
}
