import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import { ApiUrl } from '../../shared/api-url.component';
import { User } from '../../model/user/user.model';

@Injectable()
export class UserService {

  constructor(private http: Http) {

  }

  // get User by company_id from database
  getUsers(company_id: number): Promise<User[]> {
    return this.http
      .get(ApiUrl.baseUrl + 'users/' + company_id)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  // get User by company_id and user_id from database
  getUser(company_id: number, user_id: number): Promise<User> {
    return this.http
      .get(ApiUrl.baseUrl + 'user/' + company_id + '/' + user_id)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  // get User by emailId from database
  searchUserByEmail(emailId: string): Promise<User> {
    return this.http
      .get(ApiUrl.baseUrl + 'user/' + emailId)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  // save User into database
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
