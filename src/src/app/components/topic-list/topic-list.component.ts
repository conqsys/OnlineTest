import { Component, OnInit } from '@angular/core';
import {TopicModel} from '../../model/topic/topic.model';
import {TopicService} from '../../services/topic/topic.service';
@Component({
  moduleId: module.id,
  selector: 'app-topiclist',
  templateUrl: 'topic-list.component.html',
  directives: [],
  providers: [TopicModel, TopicService]
})
export class TopicListComponent {
  private model: TopicModel;
  topicdata:any;
  constructor(private Service: TopicService) {
    this.getTopic();
  }

   getTopic() {
    this.Service.getTopic(1).map(r => r.json())
      .subscribe(a => {
        if (a != undefined && a != null) {
          this.topicdata = a;       
        }
        else {
          alert(a.data);
        }
      });
  }
}