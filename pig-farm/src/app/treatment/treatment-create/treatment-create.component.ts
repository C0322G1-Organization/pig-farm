import {Component, OnInit} from '@angular/core';
import {Treatment} from '../../model/treatment';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {TreatmentService} from '../../service/treatment.service';
import {isDate} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-create-treatment',
  templateUrl: './treatment-create.component.html',
  styleUrls: ['./treatment-create.component.css']
})
export class TreatmentCreateComponent implements OnInit {
  treatment: Treatment[];
  today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  creatTreatmentForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    pigstyCode: new FormControl('', [Validators.required]),
    date: new FormControl(this.today, [Validators.required, this.dateNotExist]),
    doctor: new FormControl('', [Validators.required]),
    diseases: new FormControl('', [Validators.required]),
    medicine: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    pig: new FormControl('', [Validators.required]),
    isDelete: new FormControl('0')
  });

  constructor(private treatmentService: TreatmentService,
              private datePipe: DatePipe,
              private router: Router) {
  }
  dateNotExist(abstractControl: AbstractControl) {
    const v = abstractControl.value;
    const start = new Date(v);
    if (!isDate(start)) {
      return {dateNotExist: true, message: 'Ngày không hợp lệ'};
    }
  }
  ngOnInit(): void {
  }

  submit() {
    const saving = this.creatTreatmentForm.value;
    console.log(saving);
    this.treatmentService.save(saving).subscribe(() => {
      this.router.navigate(['/treatment']);
    });
  }
}
