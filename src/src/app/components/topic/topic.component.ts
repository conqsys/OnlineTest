import { Component, OnInit, ViewChild } from '@angular/core';
import { TopicModel } from '../../model/topic/topic.model';
import { TopicService } from '../../services/topic/topic.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'app-topic',
  templateUrl: 'topic.component.html',
  directives: [],
  providers: [TopicModel, TopicService]
})
export class TopicComponent {
  private model: TopicModel;
  btnText:string;
  constructor(private Service: TopicService, private routeinfo: ActivatedRoute, private _router: Router) {
    this.bydefault();
    this.getTopicByID(routeinfo.params);
  }

  bydefault() {
    this.model = new TopicModel();
    this.btnText='Submitted Topic';
    this.model.topic_id = 0;
    this.model.topic_title = "";
    this.model.company_id = 1;
    this.model.created_by = 'vipin';
    this.model.updated_by = 'vipin';
  }
  getTopicByID(param) {
    if (param.value.id != undefined) {
      this.Service.getTopicByID(param.value.id)
        .map(r => r.json())
        .subscribe(result => {
          this.model =result[0];
          this.btnText = 'Update Topic';
        });
    }
  }

  addTopic() {
    if (this.model.topic_title == "" || this.model.topic_title == undefined) {
      alert("Topic Title is blank");
      return false;
    }
    this.model.company_id = 1;
    this.Service.saveTopic(this.model).map(r => r.json())
      .subscribe(result => {
        if (result) {

          alert("category inserted!");
          this._router.navigate(['/topiclist']);

        }
        else {
          alert(result.data);
        }
      });
  }
}