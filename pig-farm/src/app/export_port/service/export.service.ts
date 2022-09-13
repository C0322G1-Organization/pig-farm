import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Export} from '../model/export';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Pigsty} from '../model/pigsty';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http: HttpClient) {
  }

  getAll(page: number): Observable<Export[]> {
    return this.http.get<Export[]>(API_URL + '/page?page=' + page);
  }

  getAllPigsTy(): Observable<Pigsty[]> {
    return this.http.get<Pigsty[]>(API_URL + 'pigsTy');
  }

  createExport(exports): Observable<Export> {
    return this.http.post<Export>(API_URL + '/export' + '/create', exports);
  }

  // @ts-ignore
  updateExport(id: number, exports: Export): Observable<Export> {
    return this.http.put<Export>(API_URL + '/' + id, exports);
  }
  getTotal(kilogram: number, price: number): number {
    return kilogram * price;
  }
}
