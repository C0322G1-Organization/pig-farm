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

  constructor(private http: HttpClient) { }

  saveFood(food: Food): Observable<Food> {
    return this.http.post<Food>(API_URL + '/api/food/create', food);
  }

  findById(id: number): Observable<Food> {
    return this.http.get<Food>(API_URL + `/api/food/show/${id}`);
  }

  editFood(id: number, food: Food): Observable<Food> {
    return this.http.put<Food>(API_URL + `/api/food/${id}`, food);
  }
}
