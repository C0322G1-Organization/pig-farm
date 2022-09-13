import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
const URL_API = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private httpClient: HttpClient) { }
  getAll( pageable: number, searchType: string): Observable<any[]> {
    return this.httpClient.get<any[]>(URL_API + '/api/food/list?page=' + pageable + '&foodType=' + searchType);
  }
}
