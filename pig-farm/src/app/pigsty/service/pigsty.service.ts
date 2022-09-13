import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8080/api/pigsty/';

@Injectable({
  providedIn: 'root'
})
export class PigstyService {

  constructor(private http: HttpClient) {

  }

  getAll(page: number, search: string): Observable<any> {
    return this.http.get<any>(API_URL + 'list?search=' + search + '&page=' + page);
  }
}
