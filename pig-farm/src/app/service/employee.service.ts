import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../model/employee';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  saveEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(API_URL + '/employee/create', employee);
  }

  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${API_URL}/employee/${id}`);
  }

  editEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${API_URL}/employee/edit/${id}`, employee);
  }
}
