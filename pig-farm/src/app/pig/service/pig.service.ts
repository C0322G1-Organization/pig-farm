import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pig} from '../model/pig';
import {environment} from '../../../environments/environment';

const API_URL = `${environment.apiUrlPig}`;

@Injectable({
  providedIn: 'root'
})

export class PigService {

  constructor(private http: HttpClient) {
  }

  createPig(pig: Pig): Observable<Pig> {
    return this.http.post<Pig>(API_URL + '/create', pig);
  }

  findById(id: number) {
    return this.http.get<Pig>(API_URL + `/page/${id}`);
  }

  updateComputer(id: number, pig: Pig) {
    return this.http.patch<Pig>(API_URL + `/update/${id}`, pig);
  }
}
