import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import { ApiUrl } from '../../shared/api-url.component';
import { OptionSeriesModel } from '../../model/question/question-option';

@Injectable()
export class QuestionOptionService {

  constructor(private http: Http) {

  }

  // get Question option from database
  getQuestionOptions(question_id: any): any {
    return this.http
      .get(ApiUrl.baseUrl + 'questionOptions/' + question_id)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getOptionSeries(): Promise<OptionSeriesModel[]> {
    return this.http
      .get(ApiUrl.baseUrl + 'optionSeries')
      .toPromise()
      .then(response => response.json() as OptionSeriesModel[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
