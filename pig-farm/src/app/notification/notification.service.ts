import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Notifications} from './model/notification';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const URL_NOTIFICATION = `${environment.apiUrl + '/api/v1/notification'}`;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {
  }

  getAllNotifications(page: number, contentSearch: string): Observable<Notifications[]> {
    return this.http.get<Notifications[]>(URL_NOTIFICATION);
  }

  deleteNotifications(ids: number[]): Observable<any> {
    const data = {id: ids};
    const url = URL_NOTIFICATION + '/delete';
    return this.http.post<any>(url, data);
  }

  searchByContent(content: any): Observable<Notifications[]> {
    const contentSearch: string = content.content;
    return this.http.get<Notifications[]>(URL_NOTIFICATION + '/page?content=' + contentSearch);
  }

  save(notifications): Observable<Notifications> {
    return this.http.post<Notifications>(URL_NOTIFICATION + '/create', notifications);
  }

  findById(id: number): Observable<Notifications> {
    return this.http.get<Notifications>(URL_NOTIFICATION + '/' + id);
  }

  update(id: number, notifications: Notifications): Observable<Notifications> {
    return this.http.put<Notifications>(URL_NOTIFICATION + '/update/' + id, notifications);
  }
}
