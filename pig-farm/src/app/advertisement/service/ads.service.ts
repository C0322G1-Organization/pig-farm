import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Advertisement} from '../model/advertisement';

const URL_ADS = `${environment.apiUrlAds}`;

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(private httpClient: HttpClient) {
  }

  getListAndSearch(indexPagination: number, keySearch: string): Observable<any> {
    return this.httpClient.get<any>(URL_ADS + '/page?page=' + indexPagination + '&keySearch=' + keySearch);
  }

  // getAll(page: number): Observable<Advertisement[]> {
  //   return this.httpClient.get<Advertisement[]>(URL_ADS + '/page?page=' + page);
  // }

  deleteAdvertisement(ids: number[]): Observable<any> {
    const data = {id: ids};
    const url = URL_ADS + '/delete';
    return this.httpClient.post<any>(url, data);
  }
  //
  // searchAdvertisement(objSearch: any): Observable<Advertisement[]> {
  //   const titleSearch: string = objSearch.title;
  //   return this.httpClient.get<Advertisement[]>(`${URL_ADS}/page?keySearch=` + titleSearch);
  // }
}
