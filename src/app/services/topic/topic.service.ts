 
import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ApiUrl } from '../../shared/api-url.component';
import {TopicModel} from '../../model/topic/topic.model';

@Injectable()
export class TopicService {
  constructor(private http: Http) {

  }
    saveTopic(topic:any):any{
       return this.http.post(ApiUrl.baseUrl + 'savetopic',topic);
   }
    getTopic(companyId:any):Promise<TopicModel[]>{
         return this.http
      .get(ApiUrl.baseUrl + 'gettopics/'+ companyId)
      .toPromise()
      .then(response => response.json() as TopicModel[])
      .catch(this.handleError);
       
    } 
    getTopicByID(topicId:any):any{
         return this.http.get(ApiUrl.baseUrl + 'gettopic/'+ topicId);
    }
    removeTopic(topicId:any):any{
        return this.http.get(ApiUrl.baseUrl + 'delete/'+ topicId);
    }
     private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}