import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ApiUrl } from '../../shared/api-url.component';

@Injectable()
export class QuestionOptionService {

  constructor(private http: Http) {

  }
   // get Question option from database
  getQuestionOptions(question_id:any): any {
    return this.http.get(ApiUrl.baseUrl + 'questionoptions/' + question_id);
  }
}