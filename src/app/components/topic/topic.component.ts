import { Component, OnInit, ViewChild } from '@angular/core';
import { TopicModel } from '../../model/topic/topic.model';
import { TopicService } from '../../services/topic/topic.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'app-topic',
  templateUrl: 'topic.component.html'
})
export class TopicComponent {
  private model: TopicModel;
  btnText:string;
  constructor(private service: TopicService, private routeinfo: ActivatedRoute, private router: Router) {
    this.bydefault();
     this.getTopicByID(routeinfo.params);
  }

  bydefault() {
    this.model = new TopicModel();
    this.btnText='Save Topic';
    this.model.topic_id = 0;
    this.model.topic_title = "";
    this.model.company_id = 1;
    this.model.created_by = 'vipin';
    this.model.updated_by = 'vipin';
  }
  getTopicByID(param:any) {
    if (param.value.id != undefined) {
      this.service.getTopicByID(param.value.id).then(result => {
          this.model =result[0];
          this.btnText = 'Update Topic';
        });
    }
  }

  addTopic() {
    if (this.model.topic_title == "" || this.model.topic_title == undefined) {
      alert("Please insert Topic");
      return false;
    }
    this.model.company_id = 1;
    this.service.saveTopic(this.model).then(result => {
        if (result) {
          alert("category inserted!");
          this.router.navigate(['/topiclist']);

        }
        else {
         // alert(result.data);
        }
      });
  }
}