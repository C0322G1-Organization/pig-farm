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

  // deletePig(id: number): Observable<Pig> {
  //   return this.httpClient.delete(API_URL + '/delete/' + id);
  // }

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

  // getAllPig(page: number, code, dateIn, status ) {
  //   let codeSearch;
  //   let dateInSearch;
  //   let statusSearch;
  //   if (code == null) {
  //     codeSearch = '';
  //   } else {
  //     codeSearch = code;
  //   }
  //   if (dateIn == null) {
  //     dateInSearch = '';
  //   } else {
  //     dateInSearch = dateIn;
  //   }
  //   if (status == null) {
  //     statusSearch = '';
  //   } else {
  //     statusSearch = status;
  //   }
  //   // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:max-line-length
  //   return this.httpClient.get<Pig[]>(API_URL + '/page?page=' + page + '?codeSearch=' + codeSearch + '&dateInSearch=' + dateInSearch + '&statusSearch=' + statusSearch);
  // }

  findById(idEdit: number): Observable<Pig> {
    return this.httpClient.get(API_URL + '/find/' + idEdit);
  }

  update(pig: Pig): Observable<Pig> {
    return this.httpClient.patch(API_URL + '/update', pig);
  }
  searchPig(searchObj: any): Observable<Pig[]> {
    const codeSearch = searchObj.codeSearch;
    const dateInSearch = searchObj.dateInSearch;
    const statusSearch = searchObj.statusSearch;
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Pig[]>(API_URL + '/page' + '?codeSearch=' + codeSearch + '&dateInSearch=' + dateInSearch + '&statusSearch=' + statusSearch);
  }
}
