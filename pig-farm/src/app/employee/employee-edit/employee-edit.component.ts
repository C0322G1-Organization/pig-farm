import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserDto} from '../../user/user';
import {EmployeeService} from '../employee.service';
import {UserService} from '../../user/user.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {checkBirthDay, checkDay} from '../../validate/check-birth-day';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employeeForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    code: new FormControl(''),
    name: new FormControl(''),
    birthDay: new FormControl(''),
    gender: new FormControl(''),
    idCard: new FormControl(''),
    image: new FormControl('')
  });

  id: number;

  constructor(private employeeService: EmployeeService,
              private userService: UserService,
              private toast: ToastrService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.employeeService.findById(this.id).subscribe(employee => {
        this.employeeForm = new FormGroup({
          id: new FormControl(employee.id),
          code: new FormControl(employee.code, Validators.required),
          name: new FormControl(employee.name, [Validators.required, Validators.pattern('^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$'), Validators.maxLength(30)]),
          birthDay: new FormControl(employee.birthDay, [Validators.required, checkBirthDay, checkDay]),
          gender: new FormControl(employee.gender, [Validators.required]),
          idCard: new FormControl(employee.idCard, [Validators.required, Validators.pattern('^\\d{9}|\\d{12}$')]),
          image: new FormControl(employee.image)
        });
      });
    });
  }

  ngOnInit(): void {
  }

  editEmployee(id: number): void {
    const employee = this.employeeForm.value;
    this.employeeService.editEmployee(id, employee).subscribe(() => {
      // this.router.navigate(['/employee/list']);
      this.toast.success('Sửa Thông Tin Nhân Viên Thành Công !!');
    }, error => {
      this.toast.error('Chỉnh Sửa Nhân Viên Thất Bại !!');
      console.log(error);
    });
  }
}
