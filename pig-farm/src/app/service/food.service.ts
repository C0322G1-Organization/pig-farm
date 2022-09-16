import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Food} from '../model/food';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(pageable: number, searchType: string, sort: string): Observable<any> {
    return this.httpClient.get<any>(API_URL + '/api/food/list?page=' +
      pageable + '&foodType=' + searchType + '&sort=' + sort );
  }
  saveFood(food: Food): Observable<Food> {
    return this.httpClient.post<Food>(API_URL + '/api/food/create', food);
  }

  findById(id: number): Observable<Food> {
    return this.httpClient.get<Food>(API_URL + `/api/food/show/${id}`);
  }

  editFood(id: number, food: Food): Observable<Food> {
    return this.httpClient.put<Food>(API_URL + `/api/food/${id}`, food);
  }
}
