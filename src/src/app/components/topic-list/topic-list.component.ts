import { Component, OnInit,ViewChild, EventEmitter } from '@angular/core';
import {TopicModel} from '../../model/topic/topic.model';
import {TopicService} from '../../services/topic/topic.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'app-topiclist',
  templateUrl: 'topic-list.component.html',
  directives: [],
  providers: [TopicModel, TopicService]
})
export class TopicListComponent {
  private selectedTopic:TopicModel;
  topicdata:any;
  constructor(private Service: TopicService, private routeinfo: ActivatedRoute ) {
    this.selectedTopic = new TopicModel();
    this.getTopic();
  }

   getTopic() {
    this.Service.getTopic(1).map(r => r.json())
      .subscribe(result => {
        if (result != undefined && result != null) {
          this.topicdata = result;       
        }
        else {
          alert(result.data);
        }
      });
  }
  public editTopic(item) {
    this.selectedTopic = item;
   }
   updateTopic(item) {
  this.getTopic();
  }

   public removeItem(item: any) {
    // this.data = _.filter(this.data, (elem)=>elem!=item);
    this.Service.removeTopic(item.topic_id)
      .map(r => r.json())
      .subscribe(result => {
        if (result) {
          alert("record succesfully deleted!");
          this.getTopic();
        }
        else {
          alert("record not deleted!");
        }
      });
    // console.log("Remove: ", (item.SubjectID);
  }

}