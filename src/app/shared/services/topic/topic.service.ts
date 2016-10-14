import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

import { ApiUrl } from '../../api-url.component';
import { Topic } from '../../model/topic/topic.model';

@Injectable()
export class TopicService {
  constructor(private http: Http) {

  }

  saveTopic(topic: Topic): Promise<Topic[]> {
    return this.http.post(ApiUrl.baseUrl + 'savetopic', topic).toPromise()
      .then(response => response.json() as Topic[])
      .catch(this.handleError);
  }

  getTopic(companyId: number): Promise<Topic[]> {
    return this.http
      .get(ApiUrl.baseUrl + 'gettopics/' + companyId)
      .toPromise()
      .then(response => response.json() as Topic[])
      .catch(this.handleError);
  }

  getTopicByID(topicId: number): Promise<Topic> {
    return this.http.get(ApiUrl.baseUrl + 'gettopic/' + topicId).toPromise()
      .then(response => response.json() as Topic)
      .catch(this.handleError);
  }

  removeTopic(topicId: number): Promise<Topic[]> {
    return this.http.get(ApiUrl.baseUrl + 'deletetopic/' + topicId).toPromise()
      .then(response => response.json() as Topic[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
