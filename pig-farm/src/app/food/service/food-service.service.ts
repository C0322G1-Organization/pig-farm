import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Food} from "../model/food";



@Injectable({
  providedIn: 'root'
})
export class FoodServiceService {

  private URL_S = environment.apiUrl;

  constructor(private http: HttpClient) { }

  saveFood(food : Food): Observable<Food> {
    return this.http.post<Food>(this.URL_S + "/api/food/create",food);
  }

  findById(id: number): Observable<Food> {
    return this.http.get<Food>(this.URL_S+`/api/food/show/${id}`);
  }

  editFood(id: number,food : Food): Observable<Food> {
    return this.http.put<Food>(this.URL_S+`/api/food/${id}`, food);
  }
}
