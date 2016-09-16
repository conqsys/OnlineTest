import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ApiUrl } from '../../shared/api-url.component';
import {CompanyModel} from '../../model/company/company';

@Injectable()
export class CompanyService {
  constructor(private http: Http) {

  }
    saveCompany(company:any):any{
       return this.http.post(ApiUrl.baseUrl+'company',company);
   }
     getCompanies():any{
       return this.http.get(ApiUrl.baseUrl+'getCompanies');
   }
    getCompanyById(id:any):any{
       return this.http.get(ApiUrl.baseUrl+'getCompanyById/'+id);
   }
 
}