import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const URL_S = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) {
  }

  getAll(page: number, foodTypeSearch: string): Observable<Storage[]> {
    return this.http.get<Storage[]>(URL_S + '/storage/page?page=' + page + '&keyWord=' + foodTypeSearch);
  }

  getAllS(): Observable<Storage[]> {
    return this.http.get<Storage[]>(URL_S + '/storage/list');
  }

  saveStorage(storage): Observable<Storage> {
    return this.http.post<Storage>(`${URL_S}/storage/create`, storage);
  }
}
