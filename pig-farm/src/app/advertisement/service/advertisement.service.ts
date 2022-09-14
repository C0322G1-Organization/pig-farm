import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Advertisement} from '../model/advertisement';
import {environment} from '../../../environments/environment';
import {Placement} from '../model/placement';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  constructor(private http: HttpClient) { }
  save(advertisement): Observable<Advertisement> {
    return this.http.post<Advertisement>(`${API_URL}/advertisement/post`, advertisement);
  }

  findById(id: number): Observable<Advertisement> {
    return this.http.get(`${API_URL}/advertisement/${id}`);
  }

  update(id: number, advertisement: Advertisement): Observable<Advertisement> {
    return this.http.put<Advertisement>(`${API_URL}/advertisement/${id}`, advertisement);
  }
  getListPlacement(): Observable<Placement[]> {
    return this.http.get<Placement[]>(`${API_URL}/advertisement/list/placement`);
  }
  getList(): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(API_URL );
  }

}
