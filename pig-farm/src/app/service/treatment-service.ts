import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Treatment} from '../model/treatment';

const API_URL = `${environment.apiUrl}`;
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  constructor(private http: HttpClient) {
  }

  save(saving: Treatment): Observable<Treatment> {
    return this.http.post<Treatment>(API_URL + '/api/treatment/v1/create', saving);
  }

  getAll(name: string): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(API_URL + '/api/treatment/v1/?keySearch=' + name);
  }

  deleteTreatment(id: number): Observable<Treatment> {
    return this.http.put<Treatment>(`${API_URL}/api/treatment/v1/`, id);
  }
}
