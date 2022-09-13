import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vaccination} from '../model/vaccination';
import {environment} from '../../../environments/environment';

const API_URL = environment.apiUrlVaccination;

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {

  constructor(private http: HttpClient) {
  }

  findAll(page: number, name: string): Observable<Vaccination[]> {
    return this.http.get<Vaccination[]>(API_URL + '/list?page=' + page + '&name=' + name);
  }

  searchVaccination(objSearch: any): Observable<Vaccination[]> {
    const keySearch: string = objSearch.vaccinPersonSearch;
    return this.http.get<Vaccination[]>(`${API_URL}/list?name=` + keySearch);
  }

  deleteVaccination(ids: number[]): Observable<any> {
    const data = {id: ids};
    console.log(data);
    const url = API_URL + '/delete';
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };
    return this.http.post<any>(url, data, options);
  }
}
