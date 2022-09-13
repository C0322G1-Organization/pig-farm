import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Export} from '../model/export';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http: HttpClient) { }

  getAll(page: number): Observable<Export[]> {
    return this.http.get<Export[]>(API_URL + '/export/page?page=' + page);
  }

  searchAdvertisement(objSearch: any): Observable<Export[]> {
    const codeExport: string = objSearch.codeExportSearch;
    const company: string = objSearch.companySearch;
    const name: string = objSearch.nameSearch;
    return this.http.get<Export[]>(`${API_URL}/export/page?codeExport=` + codeExport + '&company=' + company + '&nameEmployee=' + name);
  }

  deleteExport(ids: number[]): Observable<any> {
    const data = {id: ids};
    const url = API_URL + '/export/delete';
    return this.http.post<any>(url, data);
  }
}
