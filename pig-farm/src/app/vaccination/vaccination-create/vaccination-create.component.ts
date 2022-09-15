import {Component, OnInit} from '@angular/core';
import {Pigsty} from '../../model/pigsty';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PigstyService} from '../../service/pigsty.service';
import {VaccinationService} from '../../service/vaccination.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-vaccination-create',
  templateUrl: './vaccination-create.component.html',
  styleUrls: ['./vaccination-create.component.css']
})
export class VaccinationCreateComponent implements OnInit {
  constructor(private pigstyService: PigstyService,
              private vaccinationService: VaccinationService,
              private router: Router,
              private datePipe: DatePipe) {
  }
  pigstyType = '---Chọn loại chuồng---';
  vaccineType = '---Chọn loại vaccine---';
  pigstys: Pigsty[] = [];
  PRRS: string;
  Mycoplasma: string;
  CSF: string;
  FMD: string;
  APP: string;
  date2: any;
  createPigsty: any;
  vaccinationForm: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(20)]),
    vaccineType: new FormControl('', [Validators.required]),
    vaccinatedPerson: new FormControl('', [Validators.required,
      Validators.pattern('^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$')]),
    note: new FormControl('', Validators.maxLength(255)),
    pigstyCode: new FormControl('', [Validators.required]),
  });
  type = '';

  ngOnInit(): void {
    this.getAllPigsty();
  }

  submit() {
    const vaccination = this.vaccinationForm.value;
    this.vaccinationService.findById(vaccination.pigstyCode).subscribe(pigstys => {
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

  getData(type) {
    this.type = type?.value;
    // tslint:disable-next-line:radix
    this.vaccinationService.findById(parseInt(this.type)).subscribe(item => {
        this.createPigsty = item.creationDate;
      }
    );
  }

  getAllPigsty() {
    this.vaccinationService.getAll().subscribe(pigsty => {
      this.pigstys = pigsty;
    });
  }

  checkDate() {
    // @ts-ignore
    const day = new Date(this.createPigsty);
    const vaccineType = this.vaccinationForm.controls.vaccineType.value;
    if (vaccineType === 'PRRS') {
      // @ts-ignore
      const d2 =  this.datePipe.transform(new Date(day.setDate(day.getDate() + 10)), 'yyyy-MM-dd');
      this.date2 = d2;
    }
    if (vaccineType === 'Mycoplasma') {
      // @ts-ignore
      const d2 = this.datePipe.transform(new Date(day.setDate(day.getDate() + 15)), 'yyyy-MM-dd');
      this.date2 = d2;
    }
    if (vaccineType === 'CSF') {
      // @ts-ignore
      const d2 = this.datePipe.transform(new Date(day.setDate(day.getDate() + 35)), 'yyyy-MM-dd');
      this.date2 = d2;
    }
    if (vaccineType === 'FMD') {
      // @ts-ignore
      const d2 = this.datePipe.transform(new Date(day.setDate(day.getDate() + 49)), 'yyyy-MM-dd');
      this.date2 = d2;
    }
    if (vaccineType === 'APP') {
      // @ts-ignore
      const d2 = this.datePipe.transform(new Date(day.setDate(day.getDate() + 77)), 'yyyy-MM-dd');
      this.date2 = d2;
    }
  }
}
