import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Pigsty} from '../model/pigsty';
import {environment} from '../../../environments/environment';
const API_URL = `${environment.apiUrlPig}`;

@Injectable({
  providedIn: 'root'
})
export class PigstyService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Pigsty[]> {
    return this.http.get<Pigsty[]>(API_URL + '/page/pigsty');
  }
}
