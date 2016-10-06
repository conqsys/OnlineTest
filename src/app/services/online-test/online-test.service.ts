import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

import { ApiUrl } from '../../shared/api-url.component';
import { OnlineTest } from '../../model/online-test/online-test.model';

@Injectable()
export class OnlineTestService {
  constructor(private http: Http) {

  }

  // save test into database
  saveOnlineTest(onlineTest: any): Promise<OnlineTest[]> {
    return this.http.post(ApiUrl.baseUrl + 'onlineTest', onlineTest).toPromise()
      .then(response => response.json() as OnlineTest[])
      .catch(this.handleError);
  }

  // get Test from database
  getOnlineTests(): Promise<OnlineTest[]> {
    return this.http.get(ApiUrl.baseUrl + 'getOnlineTests').toPromise()
      .then(response => response.json() as OnlineTest[])
      .catch(this.handleError);
  }

  // get Test by test from database
  getOnlineTestById(id: any): Promise<OnlineTest> {
    return this.http.get(ApiUrl.baseUrl + 'getOnlineTestById/' + id).toPromise()
      .then(response => response.json() as OnlineTest)
      .catch(this.handleError);
  }

  // Remove test from database
  removeOnlineTest(id: any): Promise<OnlineTest[]> {
    return this.http.get(ApiUrl.baseUrl + 'deletetest/' + id).toPromise()
      .then(response => response.json() as OnlineTest[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
