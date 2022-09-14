import {Component, OnInit} from '@angular/core';

import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Pigsty} from '../../model/pigsty';
import {PigstyService} from '../../service/pigsty.service';

@Component({
  selector: 'app-list-pigsty',
  templateUrl: './list-pigsty.component.html',
  styleUrls: ['./list-pigsty.component.css']
})
export class ListPigstyComponent implements OnInit {
  pigstys: Pigsty[];
  page = 0;
  next: boolean;
  previous: boolean;
  search = '';
  formSearch: FormGroup;
  checkEdit = false;

  constructor(private pigstyService: PigstyService, private router: Router) {
  }

  ngOnInit(): void {
    this.getPage();
    this.formSearch = new FormGroup({
      search: new FormControl('')
    });
  }

  nextPage() {
    this.page = this.page + 1;
    this.getPage();
  }

  previousPage() {
    this.page = this.page - 1;
    this.getPage();
  }


  getPage() {
    this.pigstyService.getAll(this.page, this.search).subscribe(value => {
      this.next = !value.last;
      this.previous = !value.first;
      this.pigstys = value.content;
    });
  }

  getSearch() {
    this.search = this.formSearch.value.search;
    this.formSearch = new FormGroup({
      search: new FormControl('')
    });
    this.page = 0;
    this.getPage();
  }

  edit(value: any) {
    for (const valueKey in value) {
      if (value[valueKey] === true) {
        this.router.navigateByUrl('');
      }
    }
  }

  checkForm(value: any) {
    this.checkEdit = false;
    for (const valueKey in value) {
      if (value[valueKey] === true) {
        if (this.checkEdit === false) {
          this.checkEdit = true;
        } else {
          this.checkEdit = false;
          return;
        }
      }
    }
  }
}
