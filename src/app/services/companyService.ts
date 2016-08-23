import {Http,Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiUrls} from '../common/apiurls';


@Injectable()
export class companyService {

  constructor( private http:Http){  
        
  }

  
  getCompany (): any {
    return this.http.get(ApiUrls.baseUrl+'getCompanyDetail')
  }
  
  getCompany_info (Cmp_ID): any {
    return this.http.get(ApiUrls.baseUrl+'getCompany_info?Cmp_ID='+Cmp_ID)
  }

  insert_Update_Company_info (ComopayInfo): any {
    return this.http.post(ApiUrls.baseUrl+'insert_update_company',ComopayInfo)
  }

  

   deletecompanybyID(Cmp_ID): any {


    return this.http.get(ApiUrls.baseUrl + 'deletecompany?Cmp_ID=' + Cmp_ID);
  }
}
  