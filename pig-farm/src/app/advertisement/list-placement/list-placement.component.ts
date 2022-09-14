import { Component, OnInit } from '@angular/core';
import {Placement} from '../model/placement';
import {AdvertisementService} from '../service/advertisement.service';

@Component({
  selector: 'app-list-placement',
  templateUrl: './list-placement.component.html',
  styleUrls: ['./list-placement.component.css']
})
export class ListPlacementComponent implements OnInit {
  placementList: Placement[];
  constructor(private placementService: AdvertisementService) { }

  ngOnInit(): void {
    this.placementService.getListPlacement().subscribe(next => {
      this.placementList = next;
    });
  }

}
