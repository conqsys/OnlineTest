import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ApiUrl } from '../../shared/api-url.component';
import {QuestionModel} from '../../model/question/question';

@Injectable()
export class QuestionService {

  constructor(private http: Http) {

  }
 
  getQuestionById(question_id:any) {
    return this.http
      .get(ApiUrl.baseUrl + 'questionbyid/' + question_id)
      .toPromise()
      .then(response => response.json() as QuestionModel)
      .catch(this.handleError);

  }
  getQuestions(company_id:any): Promise<QuestionModel[]> {
    return this.http
      .get(ApiUrl.baseUrl + 'questions/' + company_id)
      .toPromise()
      .then(response => response.json() as QuestionModel[])
      .catch(this.handleError);
  }

  getQuestionsByTopic(topic_id:number): Promise<QuestionModel[]> {
     return this.http
      .get(ApiUrl.baseUrl + 'question/' + topic_id)
      .toPromise()
      .then(response => response.json() as QuestionModel[])
      .catch(this.handleError);
  }

  saveQuestion(data:any): Promise<string> {
     return this.http
      .post(ApiUrl.baseUrl + 'question', JSON.stringify(data), { headers: ApiUrl.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  deleteQuestion(id:any): any {
    return this.http.get(ApiUrl.baseUrl + 'deleteQuestion?questionID=' + id);
  }
  
   private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}