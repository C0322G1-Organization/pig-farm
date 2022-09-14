import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pig} from '../model/pig';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PigService {
  constructor(private httpClient: HttpClient) {
  }

  findAllPig(page: number): Observable<Pig[]> {
    return this.httpClient.get<Pig[]>(API_URL + '/page?page=' + page);
  }

  deletePig(ids: number[]): Observable<any> {
    const data = {id: ids};
    console.log(data);
    const url = API_URL + '/id';
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };
    // @ts-ignore
    return this.httpClient.post<any>(url, data, options);
  }

  getAllPig(page: number, code: string, dateIn: string, status: string ) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Pig[]>(API_URL + '/page?page=' + page + '&codeSearch=' + code + '&dateInSearch=' + dateIn + '&statusSearch=' + status);
  }
}
