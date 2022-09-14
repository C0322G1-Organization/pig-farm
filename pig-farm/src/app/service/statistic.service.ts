import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) {
  }

  getListCompany(): Observable<HttpEvent<any>> {
    return this.http.get<any>(`${API_URL}/statistic/listCompany`);
  }

  getStatisticByMonth(starDay, endDay, type): Observable<HttpEvent<any>> {
    return this.http.get<any>(`${API_URL}/statistic/by-month/${starDay}/${endDay}/${type}`);
  }

  getStatisticByYear(starDay, endDay, type): Observable<HttpEvent<any>> {
    return this.http.get<any>(`${API_URL}/statistic/by-year/${starDay}/${endDay}/${type}`);
  }

  getStatisticByMonthCompany(starDay, endDay, type, company): Observable<HttpEvent<any>> {
    return this.http.get<any>(`${API_URL}/statistic/by-month-company/${starDay}/${endDay}/${type}/${company}`);
  }

  getStatisticByYearCompany(starDay, endDay, type, company): Observable<HttpEvent<any>> {
    return this.http.get<any>(`${API_URL}/statistic/by-year-company/${starDay}/${endDay}/${type}/${company}`);
  }
}
