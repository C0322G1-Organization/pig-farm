import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contact} from '../model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private URL_CONTACT = 'http://localhost:8080/api/contact';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Created by: TriPT
   * Date created: 11/09/2022
   * Function: getAll Contact
   */
  getAllContact(page: number): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(this.URL_CONTACT  + '/page?page=' + page);
  }

  /**
   * Created by: TriPT
   * Date created: 11/09/2022
   * Function: findById
   */
  getContactById(id: number): Observable<Contact> {
    return this.httpClient.get<Contact>(this.URL_CONTACT + `/id/${id}`);
  }

  deleteContact(ids: number[]): Observable<any> {
    const data = {id: ids};
    console.log(data);
    const url = this.URL_CONTACT + '/delete';
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.post<any>(url, data, options);
  }

  search(content: any): Observable<Contact[]> {
    const contentSearch: string = content.content;
    return this.httpClient.get<Contact[]>(this.URL_CONTACT + '/page?nameSearch=' + contentSearch);
  }
}
