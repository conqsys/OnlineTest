import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ApiUrls } from '../../shared/ApiUrls';

@Injectable()
export class StudentService {

  constructor(private http: Http) {

  }

  getStudents (): any {
     return this.http.get(ApiUrls.baseUrl+'students')
  }

//   saveStudentDetail(data): any {
//     return this.http.post(ApiUrls.baseUrl + 'saveStudentDetail', data)
//   }

//   deleteStudent(id):any{
//     return this.http.get(ApiUrls.baseUrl+'deleteStudent?studentID='+id);
//   }
}