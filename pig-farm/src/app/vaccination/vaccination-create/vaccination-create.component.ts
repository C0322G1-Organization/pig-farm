import { Component, OnInit } from '@angular/core';
import {Pigsty} from '../../pigsty/pigsty';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PigstyService} from '../../pigsty/pigsty.service';
import {VaccinationService} from '../vaccination.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vaccination-create',
  templateUrl: './vaccination-create.component.html',
  styleUrls: ['./vaccination-create.component.css']
})
export class VaccinationCreateComponent implements OnInit {
  pigstyType = '---Chọn loại chuồng---';
  vaccineType = '---Chọn loại vaccine---';
  pigstys: Pigsty[] = [];
  vaccinationForm: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.pattern('^[1-9]{1}$')]),
    vaccineType: new FormControl('', [Validators.required]),
    vaccinatedPerson: new FormControl('', [Validators.required, Validators.pattern('^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$')]),
    note: new FormControl(''),
    pigsty: new FormControl('', [Validators.required]),
  });

  constructor(private pigstyService: PigstyService,
              private vaccinationService: VaccinationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllPigsty();
  }

  submit() {
    const vaccination = this.vaccinationForm.value;
    this.pigstyService.findById(vaccination.pigsty).subscribe(pigstys => {
      vaccination.pigsty = {
        id: pigstys.id,
        code: pigstys.code
      };
      this.vaccinationService.saveVaccination(vaccination).subscribe(() => {
        alert('Thêm mới thành công');
        this.vaccinationForm.reset();
        this.router.navigateByUrl('vaccination/vaccination-list');
      }, e => console.log(e));
    });
  }
  getAllPigsty() {
    this.pigstyService.getAll().subscribe(pigsty => {
      this.pigstys = pigsty;
    });
  }
}
