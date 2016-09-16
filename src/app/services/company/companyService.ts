import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ApiUrl } from '../../shared/api-url.component';
import {CompanyModel} from '../../model/company/company';

@Injectable()
export class CompanyService {
  constructor(private http: Http) {

  }
    saveCompany(company:any):Promise<CompanyModel[]>{
       return this.http.post(ApiUrl.baseUrl+'company',company).toPromise()
      .then(response => response.json() as CompanyModel[])
      .catch(this.handleError);
   }
     getCompanies():Promise<CompanyModel[]>{
       return this.http.get(ApiUrl.baseUrl+'getCompanies').toPromise()
      .then(response => response.json() as CompanyModel[])
      .catch(this.handleError);
   }
    getCompanyById(id:any):Promise<CompanyModel[]>{
       return this.http.get(ApiUrl.baseUrl+'getCompanyById/'+id).toPromise()
      .then(response => response.json() as CompanyModel[])
      .catch(this.handleError);
   }
     private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
 
}