 
import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ApiUrl } from '../../shared/api-url.component';
import {TopicModel} from '../../model/topic/topic.model';

@Injectable()
export class TopicService {
  constructor(private http: Http) {

  }
    saveTopic(topic):any{
       return this.http.post(ApiUrl.baseUrl + 'topic',topic);
   }
    getTopic(companyId):any{
        return this.http.get(ApiUrl.baseUrl + 'topics/'+ companyId);
    } 
    removeTopic(topicId):any{
        return this.http.get(ApiUrl.baseUrl + 'delete/'+ topicId);
    }
}