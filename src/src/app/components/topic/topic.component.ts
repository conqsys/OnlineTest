import { Component, OnInit, ViewChild, Input, Output,EventEmitter  } from '@angular/core';
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
  @Input() model: TopicModel;
  @Output() changeTopic:EventEmitter<TopicModel>;
  topicIsActive: boolean;
  constructor(private Service: TopicService) {
    this.bydefault();
    this.changeTopic = new EventEmitter<TopicModel>();
  }

  bydefault() {
    this.model = new TopicModel();
    this.model.topic_id = 0;
    this.model.topic_title = "";
    this.model.company_id = 1;
    this.model.created_by = 'vipin';
    this.model.updated_by = 'vipin';  
    this.topicIsActive = false; 
  }
  
  addTopic() {
    if(this.model.topic_title == "" || this.model.topic_title == undefined){
      alert("Topic Title is blank");
    }
    this.Service.saveTopic(this.model).map(r => r.json())
      .subscribe(result => {
        if (result.success) {
          alert("category inserted!");
          this.topicIsActive = true;
         this.changeTopic.emit(this.model);
        }
        else {
          alert(result.data);
        }
      });
  }
}