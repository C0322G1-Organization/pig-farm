import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Treatment} from '../model/treatment';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  constructor(private http: HttpClient) {
  }

  getAll(page: number, name: string): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(`${API_URL}?keySearch=` + name + `&page=` + page);
  }

  deleteTreatment(id: number): Observable<Treatment> {
    return null;
  }

  save(saving: Treatment): Observable<Treatment> {
    return this.http.post<Treatment>(API_URL + '/api/treatment/v1/create', saving);
  }
}
