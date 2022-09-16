import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Export} from '../model/export';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http: HttpClient) { }

  getAll(page: number, codeExport: string, company: string, nameEmployee: string): Observable<any> {
    return this.http.get<any>(API_URL + '/export/page?page=' + page + '&codeExport=' + codeExport + '&company=' + company + '&nameEmployee=' + nameEmployee);
  }

  deleteExport(ids: number[]): Observable<any> {
    const data = {id: ids};
    const url = API_URL + '/export/delete';
    return this.http.post<any>(url, data);
  }
}
