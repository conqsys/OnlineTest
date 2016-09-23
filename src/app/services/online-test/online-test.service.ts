import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import { ApiUrl } from '../../shared/api-url.component';
import {OnlineTestModel} from '../../model/online-test/online-test.model';
import { QuestionSetModel } from '../../model/question-set/question-set.model';

@Injectable()
export class OnlineTestService {
  constructor(private http: Http) {

  }

  // get Question from database
  getQuestion(): Promise<QuestionSetModel[]> {
    return this.http.get(ApiUrl.baseUrl + 'getQuestions').toPromise()
      .then(response => response.json() as QuestionSetModel[])
      .catch(this.handleError);
  }

  // save test into database
  saveOnlineTest(onlineTest: any): Promise<OnlineTestModel[]> {
    return this.http.post(ApiUrl.baseUrl + 'onlineTest', onlineTest).toPromise()
      .then(response => response.json() as OnlineTestModel[])
      .catch(this.handleError);
  }

  // get Test from database
  getOnlineTests(): Promise<OnlineTestModel[]> {
    return this.http.get(ApiUrl.baseUrl + 'getOnlineTests').toPromise()
      .then(response => response.json() as OnlineTestModel[])
      .catch(this.handleError);
  }

  // get Test by test from database
  getOnlineTestById(id: any): Promise<OnlineTestModel> {
    return this.http.get(ApiUrl.baseUrl + 'getOnlineTestById/' + id).toPromise()
      .then(response => response.json() as OnlineTestModel)
      .catch(this.handleError);
  }

  // Remove test from database
  removeOnlineTest(id: any): Promise<OnlineTestModel[]> {
    return this.http.get(ApiUrl.baseUrl + 'deletetest/' + id).toPromise()
      .then(response => response.json() as OnlineTestModel[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
