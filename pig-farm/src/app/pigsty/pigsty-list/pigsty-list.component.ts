import {Component, OnInit} from '@angular/core';

import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Pigsty} from '../../model/pigsty';
import {PigstyService} from '../../service/pigsty.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-pigsty-list',
  templateUrl: './pigsty-list.component.html',
  styleUrls: ['./pigsty-list.component.css']
})
export class PigstyListComponent implements OnInit {
  pigstys: Pigsty[] = [];
  page = 0;
  next: boolean;
  previous: boolean;
  search = '';
  formSearch: FormGroup;

  constructor(private pigstyService: PigstyService, private router: Router, private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Danh sách chuồng');
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
    this.search = this.formSearch.value.search.trim();
    this.search = '' + this.search;
    console.log(this.search);
    this.page = 0;
    this.getPage();
  }
}
