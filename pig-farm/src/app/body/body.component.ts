import {Component, OnInit} from '@angular/core';
import {News} from './news';
import {BodyService} from './body.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  news: News[] = [];
  totalPages: number;
  number: number;
  keyword = '';

  constructor(private newsService: BodyService) {
  }

  ngOnInit(): void {
    this.getAll(0, this.keyword);
  }

  getAll(page: number, keyword): void {
    // tslint:disable-next-line:variable-name
    this.newsService.findAll(page, keyword).subscribe(({content, number: number, totalPages: totalPages}: any) => {
      this.totalPages = totalPages;
      this.number = number;
      this.news = content;
    });
  }

  previousPage() {
    let numberPage: number = this.number;
    if (numberPage > 0) {
      numberPage--;
      this.getAll(numberPage, this.keyword);
    }
  }

  nextPage() {
    let numberPage: number = this.number;
    if (numberPage < this.totalPages - 1) {
      numberPage++;
      this.getAll(numberPage, this.keyword);
    }
  }

  search() {
    // tslint:disable-next-line:variable-name
    this.newsService.findAll(this.number, this.keyword).subscribe(({content, number: number, totalPages: totalPages}: any) => {
      this.totalPages = totalPages;
      this.number = number;
      this.news = content;
    });
  }
}
