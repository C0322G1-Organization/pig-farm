import {Component, OnInit} from '@angular/core';
import {Treatment} from '../../model/treatment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TreatmentService} from '../../service/treatment.service';


@Component({
  selector: 'app-create-treatment',
  templateUrl: './treatment-create.component.html',
  styleUrls: ['./treatment-create.component.css']
})
export class TreatmentCreateComponent implements OnInit {
  treatment: Treatment[];
  creatTreatmentForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required ]),
    pigstyCode: new FormControl('', [Validators.required]),
    date: new FormControl('' , [Validators.required,
      Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\\d\\d$')]),
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
  }

  submit() {
    const saving = this.creatTreatmentForm.value;
    this.treatmentService.save(saving).subscribe(() => {
      this.router.navigate(['/treatment']);
    });
  }
}
