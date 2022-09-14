import { Component, OnInit } from '@angular/core';
import {Placement} from '../model/placement';
import {AdvertisementService} from '../service/advertisement.service';

@Component({
  selector: 'app-placement-list',
  templateUrl: './placement-list.component.html',
  styleUrls: ['./placement-list.component.css']
})
export class PlacementListComponent implements OnInit {

  placementList: Placement[];
  constructor(private placementService: AdvertisementService) { }

  ngOnInit(): void {
    this.placementService.getListPlacement().subscribe(next => {
      this.placementList = next;
    });
  }


}
