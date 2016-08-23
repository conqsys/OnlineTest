import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiUrls} from '../common/apiurls';
@Injectable()
export class CallService {

  constructor(private http: Http) {

  }

  //   getCompany (): any {
  //     return this.http.get(ApiUrls.baseUrl+'getCompanyDetail')
  //   }

  getcallinfo(Call_ID): any {
    return this.http.get(ApiUrls.baseUrl + 'getcallinfo?Call_ID=' + Call_ID);
  }


  savecallinfodetail(data): any {
    return this.http.post(ApiUrls.baseUrl + 'savecallinfo', data)
  }

  getUpdateDetail(a): any {
    return this.http.get(ApiUrls.baseUrl + 'getcall_info_update?Cmp_ID='+a.Cmp_ID);


  }

  

  deleteCall(Call_ID): any {


    return this.http.get(ApiUrls.baseUrl + 'deletecall?Call_ID=' + Call_ID);
  }


}