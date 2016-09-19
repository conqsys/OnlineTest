import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ApiUrl } from '../../shared/api-url.component';
import { UserModel } from '../../model/user/user.model';

@Injectable()
export class UserService {

  constructor(private http: Http) {

  }

  getUsers(company_id:number) : Promise<UserModel[]> {
    return this.http
      .get(ApiUrl.baseUrl + 'users/' + company_id)
      .toPromise()
      .then(response => response.json() as UserModel[])
      .catch(this.handleError);
  }

  getUser (company_id:number, user_id:number): Promise<UserModel> {
    return this.http
      .get(ApiUrl.baseUrl + 'user/' + company_id + '/' + user_id)
      .toPromise()
      .then(response => response.json() as UserModel)
      .catch(this.handleError);
  }

  searchUserByEmail(emailId: string): Promise<UserModel> {
      return this.http
      .get(ApiUrl.baseUrl + 'user/' + emailId)
      .toPromise()
      .then(response => response.json() as UserModel)
      .catch(this.handleError);
  }

  saveUser(data:UserModel): Promise<string> {
    return this.http
      .post(ApiUrl.baseUrl + 'user', JSON.stringify(data), { headers: ApiUrl.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}