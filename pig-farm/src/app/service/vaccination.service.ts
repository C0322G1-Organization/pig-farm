import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vaccination} from '../model/vaccination';

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
}
