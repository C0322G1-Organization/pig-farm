import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {News} from "./news";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class BodyService {

  constructor(private http: HttpClient) {
  }

  findAll(page: number): Observable<News[]> {
    return this.http.get<News[]>(API_URL + '/api/v1/notification?page=' + page);
  }

  findById(id: number): Observable<News> {
    return this.http.get<News>(`${API_URL}/api/v1/notification/${id}`);
  }
}
