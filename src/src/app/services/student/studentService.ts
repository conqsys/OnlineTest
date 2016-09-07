import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ApiUrl } from '../../shared/api-url.component';

@Injectable()
export class StudentService {

  constructor(private http: Http) {

  }

  getStudents (): any {
     return this.http.get(ApiUrl.baseUrl+'students')
  }

//   saveStudentDetail(data): any {
//     return this.http.post(ApiUrls.baseUrl + 'saveStudentDetail', data)
//   }

//   deleteStudent(id):any{
//     return this.http.get(ApiUrls.baseUrl+'deleteStudent?studentID='+id);
//   }
}