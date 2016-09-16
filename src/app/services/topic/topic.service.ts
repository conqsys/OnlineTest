 
import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ApiUrl } from '../../shared/api-url.component';
import {TopicModel} from '../../model/topic/topic.model';

@Injectable()
export class TopicService {
  constructor(private http: Http) {

  }
    saveTopic(topic:any):Promise<TopicModel[]>{
       return this.http.post(ApiUrl.baseUrl + 'savetopic',topic).toPromise()
      .then(response => response.json() as TopicModel[])
      .catch(this.handleError);
   }
    getTopic(companyId:any):Promise<TopicModel[]>{
         return this.http
      .get(ApiUrl.baseUrl + 'gettopics/'+ companyId)
      .toPromise()
      .then(response => response.json() as TopicModel[])
      .catch(this.handleError);
       
    } 
    getTopicByID(topicId:any):Promise<TopicModel[]>{
         return this.http.get(ApiUrl.baseUrl + 'gettopic/'+ topicId).toPromise()
      .then(response => response.json() as TopicModel[])
      .catch(this.handleError);
    }
    removeTopic(topicId:any):Promise<TopicModel[]>{
        return this.http.get(ApiUrl.baseUrl + 'delete/'+ topicId).toPromise()
      .then(response => response.json() as TopicModel[])
      .catch(this.handleError);
    }
     private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}