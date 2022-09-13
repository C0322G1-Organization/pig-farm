import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Notifications} from '../model/notification';
import {environment} from '../../../environments/environment';

const API_URL = environment.apiUrl + '/api/v1/notification/';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Notifications[]> {
    return this.http.get<Notifications[]>(API_URL);
  }

  save(notifications): Observable<Notifications> {
    return this.http.post<Notifications>(API_URL + 'create', notifications);
  }

  findById(id: number): Observable<Notifications> {
    return this.http.get<Notifications>(API_URL + id);
  }

  update(id: number, notifications: Notifications): Observable<Notifications> {
    return this.http.put<Notifications>(API_URL + 'update/' + id, notifications);
  }
}
