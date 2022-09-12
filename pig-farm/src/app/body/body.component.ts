import {Component, OnInit} from '@angular/core';
import {News} from "./news";
import {BodyService} from "./body.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  news: News[] = [];
  totalPages: number;
  number: number;

  constructor(private newsService: BodyService) {
  }

  ngOnInit(): void {
    this.getAll(0);
  }

  getAll(page: number): void {
    // @ts-ignore
    this.newsService.findAll(page).subscribe(({content, number: number, totalPages: totalPages}: News[]) => {

      this.totalPages = totalPages;
      this.number = number;
      this.news = content;
      console.log(this.news);
    });
  }

  previousPage() {
    let numberPage: number = this.number;
    if (numberPage > 0) {
      numberPage--;
      this.getAll(numberPage);
    }
  }

  nextPage() {
    let numberPage: number = this.number;
    if (numberPage < this.totalPages - 1) {
      numberPage++;
      this.getAll(numberPage);
    }
  }
}
