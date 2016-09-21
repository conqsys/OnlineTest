import { Component, OnInit,ViewChild, EventEmitter } from '@angular/core';
import {TopicModel} from '../../model/topic/topic.model';
import {TopicService} from '../../services/topic/topic.service';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
declare var Materialize:any;
@Component({
  moduleId: module.id,
  selector: 'app-topiclist',
  templateUrl: 'topic-list.component.html',
  providers: [TopicModel, TopicService]
})
export class TopicListComponent {
  private selectedTopic:TopicModel;
  topicdata:any;
  constructor(private service: TopicService, private routeinfo: ActivatedRoute,private router:Router ) {
    this.selectedTopic = new TopicModel();
    this.getTopic();
  }
// get Topic by company_id
   getTopic() {
    this.service.getTopic(1).then(result => {
        if (result != undefined && result != null) {
          this.topicdata = result;   
         // Materialize.toast('Topic Loaded !', 2000, 'rounded');    
        }
        else {
         // alert(result.data);
        }
      });
  }
  // navigate topic_id to Topic Component.ts
  public editTopic(item:TopicModel) {
    this.router.navigate(['/topic/' + item.topic_id]);
   }
  //open topic page for add topic 
  public showTopic(){
    this.router.navigate(['/topic']);
  }
//remove Topic by topic_id
   public removeItem(item: any) {
   // this.data = _.filter(this.data, (elem)=>elem!=item);
    this.service.removeTopic(item.topic_id).then(result => {
        if (result) {
          Materialize.toast('Topic deleted!', 2000, 'rounded');
          this.getTopic();
        }
        else {
           Materialize.toast('Topic not deleted!', 2000, 'rounded');
          alert("");
        }
      });
    // console.log("Remove: ", (item.SubjectID);
  }

}