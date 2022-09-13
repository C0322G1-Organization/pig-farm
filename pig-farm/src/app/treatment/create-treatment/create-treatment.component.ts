import {Component, OnInit} from '@angular/core';
import {Treatment} from '../../model/treatment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TreatmentService} from '../../service/treatment-service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-create-treatment',
  templateUrl: './create-treatment.component.html',
  styleUrls: ['./create-treatment.component.css']
})
export class CreateTreatmentComponent implements OnInit {
  treatment: Treatment[];
  creatTreatmentForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required ]),
    pigstyCode: new FormControl(''),
    date: new FormControl('' , [Validators.required ,
      Validators.pattern('^(?:\d{4}\-(?:(?:(?:(?:0[13578]|1[02])\-(?:0[1-9]|[1-2][0-9]|3[01]))|(?:(?:0[469]|11)' +
        '\-(?:0[1-9]|[1-2][0-9]|30))|(?:02\-(?:0[1-9]|1[0-9]|2[0-8]))))|' +
        '(?:(?:\d{2}(?:0[48]|[2468][048]|[13579][26]))|(?:(?:[02468][048])|[13579][26])00)\-02\-29)$')]),
    doctor: new FormControl('' , [Validators.required]),
    diseases: new FormControl('' , [Validators.required]),
    medicine: new FormControl('' , [Validators.required]),
    amount: new FormControl('' , [Validators.required]),
    pigCode: new FormControl('' , [Validators.required]),
    isDelete: new FormControl('0')
  });

  constructor(private treatmentService: TreatmentService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.treatmentService.getAll(name);
  }

  submit() {
    const saving = this.creatTreatmentForm.value;
    this.treatmentService.save(saving).subscribe(() => {
      // this.router.navigate(['/treatment']);
      console.log('da vao');
    });
  }
}
