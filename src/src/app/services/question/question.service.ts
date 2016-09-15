import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ApiUrl } from '../../shared/api-url.component';

@Injectable()
export class QuestionService {

  constructor(private http: Http) {

  }
  getQuestionById(question_id) {
    return this.http.get(ApiUrl.baseUrl + 'questionbyid/' + question_id);

  }
  getQuestions(company_id): any {
    return this.http.get(ApiUrl.baseUrl + 'questions/' + company_id);
  }

  getQuestionsByTopic(topic_id): any {
    return this.http.get(ApiUrl.baseUrl + 'question/' + topic_id);
  }

  saveQuestion(data): any {
    return this.http.post(ApiUrl.baseUrl + 'question', data)
  }

  deleteQuestion(id): any {
    return this.http.get(ApiUrl.baseUrl + 'deleteQuestion?questionID=' + id);
  }
}