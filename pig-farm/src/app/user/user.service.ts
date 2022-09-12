import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/user');
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/user', user);
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`${API_URL}/user/${id}`);
  }

  editUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${API_URL}/user/${id}`, user);
  }
}
