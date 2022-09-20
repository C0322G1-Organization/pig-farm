import { Component, OnInit } from '@angular/core';
import {BodyService} from '../body.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Advertisement} from '../../model/advertisement';
import {AdvertisementService} from '../../service/advertisement.service';

@Component({
  selector: 'app-info-news',
  templateUrl: './info-news.component.html',
  styleUrls: ['./info-news.component.css']
})
export class InfoNewsComponent implements OnInit {
  advertisement: Advertisement[] = [];
  titleNew: string;
  contentNew: string;
  dateSubmitted: string;
  img: string;
  id: number;

  constructor(private newsService: BodyService,
              private activatedRoute: ActivatedRoute,
              private advertisementList: AdvertisementService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.findById(this.id);
    });
  }

  ngOnInit(): void {
    this.getAllAdvertisement();
  }

  getAllAdvertisement(): void {
    this.advertisementList.getListAdvertisement().subscribe(next => {
      this.advertisement = next;
    });
  }

  findById(id: number) {
    return this.newsService.findById(id).subscribe(news => {
      this.titleNew = news.title;
      this.contentNew = news.content;
      this.dateSubmitted = news.submittedDate;
      this.img = news.image;
    });
  }
}
