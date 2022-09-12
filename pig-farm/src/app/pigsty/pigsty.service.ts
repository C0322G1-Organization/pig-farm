import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pigsty} from './pigsty';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class PigstyService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Pigsty[]> {
    return this.http.get<Pigsty[]>(API_URL + '/api/vaccination/create');
  }

  findById(id: number): Observable<Pigsty> {
    return this.http.get<Pigsty>(`${API_URL}/api/vaccination/create/${id}`);
  }
}
