import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../employee.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Employee} from '../employee';
import {checkBirthDay, checkDay} from '../../validate/check-birth-day';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  selectedImage: File = null;
  checkImgSize = false;
  regexImageUrl = false;
  editImageState = false;
  checkImg: boolean;
  url: any;
  msg = '';

  employeeForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    code: new FormControl('', [Validators.required, Validators.pattern('^(NV-)+([0-9]{3})$')]),
    name: new FormControl('', [Validators.required, Validators.pattern('^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$'), Validators.maxLength(30)]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    creationDate: new FormControl(''),
    birthDay: new FormControl('', [Validators.required, checkBirthDay, checkDay]),
    gender: new FormControl('', [Validators.required]),
    idCard: new FormControl('', [Validators.required, Validators.pattern('^\\d{9}|\\d{12}$')]),
    image: new FormControl('')
  });

  constructor(private employeeService: EmployeeService,
              private toast: ToastrService,
              private router: Router,
              private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }

  submitImage() {
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const filePath = `employee/${nameImg}`;
    const fileRef = this.storage.ref(filePath);
    let employee: Employee;
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.employeeForm.patchValue({image: url});
          console.log(url);
          employee = {
            code: this.employeeForm.value.code,
            name: this.employeeForm.value.name,
            userDto: {
              username: this.employeeForm.value.username,
              password: this.employeeForm.value.password,
              email: this.employeeForm.value.email,
            },
            birthDay: this.employeeForm.value.birthDay,
            gender: this.employeeForm.value.gender,
            idCard: this.employeeForm.value.idCard,
            image: url
          };
          console.log(employee);
          this.employeeService.saveEmployee(employee).subscribe(() => {
            console.log(1);
            this.router.navigate(['/employee/list']);
            this.toast.success('Thêm Mới Nhân Viên Thành Công !!');
          }, error => {
            this.toast.error('Thêm Mới Nhân Viên Thất Bại !!');
            console.log(error);
          });
        });
      })
    ).subscribe();
  }

  onFileSelected(event) {
    this.regexImageUrl = false;
    if (event.target.files[0].size > 9000000) {
      return;
    }
    this.selectedImage = event.target.files[0];
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG)$')) {
      this.regexImageUrl = true;
      return;
    }
    this.employeeForm.patchValue({imageUrl: this.selectedImage.name});
  }

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      return;
    }
    if (event.target.files[0].size > 9000000) {
      return;
    }
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG)$')) {
      return;
    }
    this.checkImgSize = false;
    this.checkImg = false;
    this.editImageState = true;

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Chỉ có file ảnh được hỗ trợ';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
    };
  }
}
