import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ExportService} from '../service/export.service';
import {Pigsty} from '../model/pigsty';
import {Employee} from '../model/employee';
import {EmployeeService} from '../service/employee.service';
import {PigstyService} from '../service/pigsty.service';
import {Toast, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './export-port-create.component.html',
  styleUrls: ['./export-port-create.component.css']
})
export class ExportPortCreateComponent implements OnInit {
  exportForm: FormGroup = new FormGroup({
    codeExport: new FormControl(),
    company: new FormControl(),
    amount: new FormControl(),
    kilogram: new FormControl(),
    saleDate: new FormControl(),
    price: new FormControl(),
    totalMoney: new FormControl(),
    typePigs: new FormControl(),
    isDeleted: new FormControl(),
    pigsty: new FormControl(),
    employee: new FormControl()
  });
  pigstyList: Pigsty[];
  employeeList: Employee[];
  total: number;
  employeeName: string;

  constructor(private exportService: ExportService,
              private employeeService: EmployeeService,
              private pigstyService: PigstyService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.employeeService.getAllEmployee().subscribe(value => {
      console.log(value);
      this.employeeList = value.content;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.employeeList.length; i++) {
        if (this.exportForm.value.employee === this.employeeList[i].id) {
          this.employeeName = this.employeeList[i].name;
        }
      }
    });
    this.pigstyService.getAllPigsty().subscribe(value => {
      this.pigstyList = value;

    });
    this.exportForm = new FormGroup({
      codeExport: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      kilogram: new FormControl('', [Validators.required]),
      saleDate: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      totalMoney: new FormControl(),
      typePigs: new FormControl('', [Validators.required]),
      isDeleted: new FormControl('', [Validators.required]),
      pigsty: new FormControl('', [Validators.required]),
      employee: new FormControl('', [Validators.required])
    });
  }

  createExport() {
    const exports = this.exportForm.value;
    this.exportService.createExport(exports).subscribe(value => {
      this.toast.success('them moi thanh cong', 'thong bao');
      this.exportForm.reset();
    }, error => {
      this.toast.success('xay ra loi roi', 'thong bao');
    });
  }

  getTotalMoney() {
    this.total = this.exportService.getTotal(this.exportForm.value.kilogram, this.exportForm.value.price);
  }



}
