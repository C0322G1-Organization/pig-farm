import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private URL_EMPLOYEE_SPRING = 'http://localhost:8080/employee';

  constructor(private http: HttpClient) {
  }

  deleteEmployee(id: number): Observable<any> {
    // @ts-ignore
    return this.http.patch<any>(this.URL_EMPLOYEE_SPRING + '/delete/' + id);
  }

  getListEmployeeBySearchAndPagination(name: string, idCard: string, indexPagination: number): Observable<any> {
    return this.http.get<any>(this.URL_EMPLOYEE_SPRING + '/searchList?name=' + name + '&idCard=' + idCard +
      '&page=' + indexPagination);
  }

}
