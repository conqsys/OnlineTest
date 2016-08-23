import {Http,Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiUrls} from '../common/apiurls';
@Injectable()
export class contactService {

  constructor( private http:Http){  
        
  }
    
  
  insert_Update_Contact_info(ContactDetail):any{
    return this.http.post(ApiUrls.baseUrl+'insert_update_contact',ContactDetail)
  }
  getAllContactDetail(obj):any{

if(obj.cmp_ID==undefined ){
   return this.http.get(ApiUrls.baseUrl+'getAllContactDetail?Cmp_ID='+obj.Cmp_ID);
 
  }
  else{
  return this.http.get(ApiUrls.baseUrl+'getAllContactDetail?Cmp_ID='+obj.cmp_ID);

  }
}

  deleteContact(Con_ID):any{

 return this.http.get(ApiUrls.baseUrl+'deletecontact?Con_ID='+Con_ID)

  }

  }
  
//   getCompany_info (Cmp_ID): any {
//     return this.http.get(ApiUrls.baseUrl+'getCompany_info?Cmp_ID='+Cmp_ID)
//   }

