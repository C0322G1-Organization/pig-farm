import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../entity/notification';
import {environment} from '../../environments/environment';

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

  getAllNotifications(page: number, contentSearch: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(URL_NOTIFICATION + '/page?page=' + page + '&content=' + contentSearch);
  }

  deleteNotifications(ids: number[]): Observable<any> {
    const data = {id: ids};
    const url = URL_NOTIFICATION + '/delete';
    return this.http.post<any>(url, data);
  }
}
