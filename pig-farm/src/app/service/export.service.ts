import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Export} from '../model/export';
import {environment} from '../../environments/environment';


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  constructor(private http: HttpClient) {
  }

  createExport(exports): Observable<Export> {
    return this.http.post<Export>(API_URL + '/export/create', exports);
  }

  // @ts-ignore
  updateExport(id: number, exports: Export): Observable<Export> {
    return this.http.put<Export>(API_URL + '/export/update/' + id, exports);
  }

  getTotalWeightCount(id: number) {
    return this.http.get<number[]>(API_URL + '/export/totalWeightCount/' + id);
  }

  getTotal(kilogram: number, price: number): number {
    return kilogram * price;
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(API_URL + '/export/show/' + id);
  }

  checkCode(codeExport: string): Observable<string> {
    return this.http.get<string>(API_URL + '/export/check/' + codeExport);
  }

  getAll(page: number): Observable<Export[]> {
    return this.http.get<Export[]>(API_URL + '/export/page?page=' + page);
  }

  searchExport(objSearch: any): Observable<Export[]> {
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
