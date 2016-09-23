import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import { ApiUrl } from '../../shared/api-url.component';
import {CompanyModel} from '../../model/company/company';

@Injectable()
export class CompanyService {
  constructor(private http: Http) {

  }

  // save company into database
  saveCompany(company: any): Promise<CompanyModel[]> {
    return this.http.post(ApiUrl.baseUrl + 'company', company).toPromise()
      .then(response => response.json() as CompanyModel[])
      .catch(this.handleError);
  }

  // get company from database
  getCompanies(): Promise<CompanyModel[]> {
    return this.http.get(ApiUrl.baseUrl + 'getCompanies').toPromise()
      .then(response => response.json() as CompanyModel[])
      .catch(this.handleError);
  }

  // get company by company_id from database
  getCompanyById(id: any): Promise<CompanyModel> {
    return this.http.get(ApiUrl.baseUrl + 'getCompanyById/' + id).toPromise()
      .then(response => response.json() as CompanyModel)
      .catch(this.handleError);
  }

  // error handling method
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
