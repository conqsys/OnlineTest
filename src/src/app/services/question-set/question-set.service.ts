import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ApiUrl } from '../../shared/api-url.component';

@Injectable()
export class QuestionSetService {

  constructor(private http: Http) {

  }

  getQuestionSets (company_id): any {
     return this.http.get(ApiUrl.baseUrl + 'questionSet/' + company_id);
  }

  getQuestionSet (company_id, question_set_id): any {
     return this.http.get(ApiUrl.baseUrl + 'questionSet/' + company_id + '/' + question_set_id);
  }

  saveQuestionsInQuestionSet(data): any {
    return this.http.post(ApiUrl.baseUrl + 'saveSetQuestion', data)
  }

  saveQuestionSet(data): any {
    return this.http.post(ApiUrl.baseUrl + 'saveQuestionSet', data)
  }

  deleteSetQuestion(set_question_id):any{
    return this.http.delete(ApiUrl.baseUrl+'deleteSetQuestion/'+set_question_id);
  }
}