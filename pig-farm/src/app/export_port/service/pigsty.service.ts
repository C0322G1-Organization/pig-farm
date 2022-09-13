import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pigsty} from '../model/pigsty';

@Injectable({
  providedIn: 'root'
})
export class PigstyService {
  API_URL = `${environment.apiUrl}` ;

  constructor(private http: HttpClient) { }
  getAllPigsty(): Observable<Pigsty[]> {
    return this.http.get<Pigsty[]>(this.API_URL + '/pigsty/getList' );
  }
}
