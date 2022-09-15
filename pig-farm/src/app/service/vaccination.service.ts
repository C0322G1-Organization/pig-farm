import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vaccination} from '../model/vaccination';
import {Pigsty} from '../model/pigsty';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class VaccinationService {
  constructor(private http: HttpClient) {
  }

  saveVaccination(vaccination): Observable<Vaccination> {
    return this.http.post<Vaccination>(API_URL + '/api/vaccination/create', vaccination);
  }

  findAll(page: number, name: string): Observable<Vaccination[]> {
    return this.http.get<Vaccination[]>(API_URL + '/api/vaccination/list?page=' + page + '&name=' + name);
  }

  searchVaccination(objSearch: any): Observable<Vaccination[]> {
    const keySearch: string = objSearch.vaccinPersonSearch;
    return this.http.get<Vaccination[]>(`${API_URL}/api/vaccination/list?name=` + keySearch);
  }

  deleteVaccination(ids: number[]): Observable<any> {
    const data = {id: ids};
    console.log(data);
    const url = API_URL + '/api/vaccination/delete';
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };
    return this.http.post<any>(url, data, options);
  }

  getAll(): Observable<Pigsty[]> {
    return this.http.get<Pigsty[]>(API_URL + '/pigsty/list');
  }

  findById(id: number): Observable<Pigsty> {
    return this.http.get<Pigsty>(`${API_URL}/pigsty/by/${id}`);
  }
}
