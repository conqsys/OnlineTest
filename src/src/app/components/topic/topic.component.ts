import { Component, OnInit, ViewChild, Input, Output  } from '@angular/core';
import {TopicModel} from '../../model/topic/topic.model';
import {TopicService} from '../../services/topic/topic.service';
@Component({
  moduleId: module.id,
  selector: 'app-topic',
  templateUrl: 'topic.component.html',
  directives: [],
  providers: [TopicModel, TopicService]
})
export class TopicComponent {
  private model: TopicModel;
  constructor(private Service: TopicService) {
    this.bydefault();
  }

  bydefault() {
    this.model = new TopicModel();
    this.model.topic_id = 0;
    this.model.topic_title = "";
    this.model.created_by = 'vipin';
    this.model.updated_by = 'vipin';   
  }
 
  addTopic() {
    this.Service.saveTopic(this.model).map(r => r.json())
      .subscribe(a => {
        if (a.success) {
          alert("category inserted!");
        
        }
        else {
          alert(a.data);
        }
      });
  }
}