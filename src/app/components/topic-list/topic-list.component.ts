import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import {BaseComponent} from '../base.component';
import { LocalStorageService } from 'angular-2-local-storage';

import {TopicModel} from '../../model/topic/topic.model';
import {TopicService} from '../../services/topic/topic.service';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
declare var Materialize: any;

@Component({
  moduleId: module.id,
  selector: 'app-topiclist',
  templateUrl: 'topic-list.component.html',
  providers: [TopicModel, TopicService]
})
export class TopicListComponent extends BaseComponent implements OnInit {
  private selectedTopic: TopicModel;
  topicdata: any;
  constructor(private service: TopicService,
    private routeinfo: ActivatedRoute,
    localStorageService: LocalStorageService,
    router: Router) {
    super(localStorageService, router);
    this.selectedTopic = new TopicModel();
  }

  ngOnInit(): void {
    if (this.user) {
      this.getTopic();
    }
  }

  // get Topic by company_id
  getTopic() {
    this.service.getTopic(this.user.company_id).then(result => {
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
  public editTopic(item: TopicModel) {
    this.router.navigate(['/topic/' + item.topic_id]);
  }
  //open topic page for add topic 
  public showTopic() {
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