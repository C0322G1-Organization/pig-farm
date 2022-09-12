import { Component, OnInit } from '@angular/core';
import {Pig} from '../../model/pig';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-pig-create',
  templateUrl: './pig-create.component.html',
  styleUrls: ['./pig-create.component.css']
})
export class PigCreateComponent implements OnInit {
  pig: Pig[];
  control: FormControl[];
  constructor() { }

  ngOnInit(): void {
  }

}
