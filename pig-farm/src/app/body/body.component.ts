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
  checkNext: boolean;
  checkPrevious: boolean;

  constructor(private newsService: BodyService) {
  }

  ngOnInit(): void {
    this.getAll(0, this.keyword);
  }

  getAll(page: number, keyword): void {
    this.newsService.findAll(page, keyword).subscribe((result: any) => {
      this.totalPages = result?.totalPages;
      this.number = result?.number;
      this.news = result?.content;
      this.checkNext = !result.last;
      this.checkPrevious = !result.first;
    });
  }


  goPrevious() {
    this.number--;
    this.getAll(this.number, this.keyword);
  }

  goNext() {
    this.number++;
    this.getAll(this.number, this.keyword);
  }

  search() {
    this.getAll(0, this.keyword);
  }
}
