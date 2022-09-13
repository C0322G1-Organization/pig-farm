import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Treatment} from '../model/treatment';


@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  private URL_API = 'http://localhost:8080/api/treatment/v1/';

  constructor(private http: HttpClient) {
  }

  getAll(page: number, name: string): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(`${this.URL_API}?keySearch=` + name + `&page=` + page);
  }

  deleteTreatment(id: number): Observable<Treatment> {
    return this.http.put<Treatment>(this.URL_API + `${id}`);
  }

  save(saving: Treatment): Observable<Treatment> {
    return this.http.post<Treatment>(API_URL + '/api/treatment/v1/create', saving);
  }
}
