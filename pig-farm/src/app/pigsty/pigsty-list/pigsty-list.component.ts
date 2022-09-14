import {Component, OnInit} from '@angular/core';

import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Pigsty} from '../../model/pigsty';
import {PigstyService} from '../../service/pigsty.service';

@Component({
  selector: 'app-pigsty-list',
  templateUrl: './pigsty-list.component.html',
  styleUrls: ['./pigsty-list.component.css']
})
export class PigstyListComponent implements OnInit {
  pigstys: Pigsty[];
  page = 0;
  next: boolean;
  previous: boolean;
  search = '';
  formSearch: FormGroup;
  deleteList: number[] = [];

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
    this.page = 0;
    this.getPage();
  }

  edit() {
    if (this.deleteList.length === 1) {
      this.router.navigateByUrl('pigsty/edit/' + this.deleteList[0]);
    }
  }

  checkbox(pigsty: Pigsty) {
    for (const item of this.deleteList) {
      if (item === pigsty.id) {
        return true;
      }
    }
    return false;
  }

  checkList(id: number) {
    for (let i = 0; i < this.deleteList.length; i++) {
      if (this.deleteList[i] === id) {
        this.deleteList.splice(i, 1);
        console.log(this.deleteList);
        return;
      }
    }
    this.deleteList.push(id);
  }

  showEdit() {
    return (this.deleteList.length === 1);
  }
}
