import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ApiUrls } from '../../shared/ApiUrls';
import {CompanyModel} from '../../model/company/company';

@Injectable()
export class CompanyService {
  constructor(private http: Http) {

  }
    saveCompany(company):any{
       return this.http.post(ApiUrls.baseUrl+'company',company);
   }
 
}