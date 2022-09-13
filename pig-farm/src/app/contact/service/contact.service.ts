import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contact} from '../model/contact';
import {environment} from '../../../environments/environment';

const URL_CONTACT = `${environment.apiUrl + '/api/contact'}`;

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Created by: TriPT
   * Date created: 11/09/2022
   * Function: getAll Contact
   */
  getAllContact(page: number, nameSearch: string): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(URL_CONTACT + '/page?page=' + page + '&nameSearch=' + nameSearch);
  }

  /**
   * Created by: TriPT
   * Date created: 11/09/2022
   * Function: findById
   */
  getContactById(id: number): Observable<Contact> {
    return this.httpClient.get<Contact>(URL_CONTACT + `/${id}`);
  }

  deleteContact(ids: number[]): Observable<any> {
    const data = {id: ids};
    const url = URL_CONTACT + '/delete';
    return this.httpClient.post<any>(url, data);
  }

}
