import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ApiUrl } from '../../shared/api-url.component';

@Injectable()
export class QuestionSetService {

  constructor(private http: Http) {

  }

  getQuestionSets (company_id): any {
     return this.http.get(ApiUrl.baseUrl+'questionSet?company_id='+company_id)
  }

//   saveStudentDetail(data): any {
//     return this.http.post(ApiUrls.baseUrl + 'saveStudentDetail', data)
//   }

//   deleteStudent(id):any{
//     return this.http.get(ApiUrls.baseUrl+'deleteStudent?studentID='+id);
//   }
}