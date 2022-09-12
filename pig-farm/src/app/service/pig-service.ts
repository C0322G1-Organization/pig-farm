import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
const API_URL = `${environment.API_URL}`;
@Injectable({
  providedIn: 'root'
})
export class PigService {

  constructor() { }
}
