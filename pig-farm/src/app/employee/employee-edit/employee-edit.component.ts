import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../employee.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
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
  selectedImage: File = null;
  checkImgSize = false;
  regexImageUrl = false;
  editImageState = false;
  checkImg: boolean;
  url: any;
  msg = '';
  loader = true;

  constructor(private employeeService: EmployeeService,
              private toast: ToastrService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private storage: AngularFireStorage) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.employeeService.findById(this.id).subscribe(employee => {
        this.employeeForm = new FormGroup({
          id: new FormControl(employee.id),
          code: new FormControl(employee.code, Validators.required),
          name: new FormControl(employee.name, [Validators.required, Validators.maxLength(30), Validators.pattern('^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$')]),
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

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }

  editEmployee() {
    this.loader = false;
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const filePath = `employee/${nameImg}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.employeeForm.patchValue({image: url});
          console.log(url);
          this.employeeService.editEmployee(this.id, this.employeeForm.value).subscribe(() => {
            this.router.navigate(['/employee/list']);
            this.toast.success('Sửa Thông Tin Nhân Viên Thành Công !!', 'Thông báo');
          }, error => {
            this.toast.error('Sửa Thông Tin Nhân Viên Thất Bại !!', 'Thông báo');
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

  reset() {
    // this.employeeForm.reset();
    this.selectedImage = null;
    this.checkImgSize = false;
    this.regexImageUrl = false;
    this.editImageState = false;
    this.checkImg = false;
  }
}
