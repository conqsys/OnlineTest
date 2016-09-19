import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ApiUrl } from '../../shared/api-url.component';
import {OnlineTestModel} from '../../model/online-test/online-test.model';

@Injectable()
export class OnlineTestService {
  constructor(private http: Http) {

  }
    saveOnlineTest(onlineTest:any):Promise<OnlineTestModel[]>{
       return this.http.post(ApiUrl.baseUrl+'onlineTest',onlineTest).toPromise()
      .then(response => response.json() as OnlineTestModel[])
      .catch(this.handleError);
   }
     getOnlineTests():Promise<OnlineTestModel[]>{
       return this.http.get(ApiUrl.baseUrl+'getOnlineTests').toPromise()
      .then(response => response.json() as OnlineTestModel[])
      .catch(this.handleError);
   }
    getOnlineTestById(id:any):Promise<OnlineTestModel>{
       return this.http.get(ApiUrl.baseUrl+'getOnlineTestById/'+id).toPromise()
      .then(response => response.json() as OnlineTestModel)
      .catch(this.handleError);
   }
     private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
 
}