import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Food} from '../model/food';
const URL_API = `${environment.ariUrl}`;

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private httpClient: HttpClient) {
  }
  getAll(): Observable<Food[]> {
    return this.httpClient.get<Food[]>(URL_API + '/api/food/list');
  }
}
