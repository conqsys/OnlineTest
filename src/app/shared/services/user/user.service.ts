import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

import { ApiUrl } from '../../api-url.component';
import { User } from '../../model/user/user.model';

@Injectable()
export class UserService {

  constructor(private http: Http) {

  }

  getUsers(company_id: number): Promise<User[]> {
    return this.http
      .get(ApiUrl.baseUrl + 'users/' + company_id)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  getUser(company_id: number, user_id: number): Promise<User> {
    return this.http
      .get(ApiUrl.baseUrl + 'user/' + company_id + '/' + user_id)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  searchUserByEmail(emailId: string): Promise<User> {
    return this.http
      .get(ApiUrl.baseUrl + 'user/' + emailId)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  saveUser(data: User): Promise<string> {
    return this.http
      .post(ApiUrl.baseUrl + 'user', JSON.stringify(data))
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
