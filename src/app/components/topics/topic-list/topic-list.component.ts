import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import { BaseComponent } from '../../base.component';

import { Topic } from '../../../model/topic/topic.model';
import { TopicService } from '../../../services/topic/topic.service';

declare var Materialize: any;

@Component({
  moduleId: module.id,
  selector: 'app-topiclist',
  templateUrl: 'topic-list.component.html',
})
export class TopicListComponent extends BaseComponent implements OnInit {
  selectedTopic: Topic;
  topicdata: any;
  constructor(private service: TopicService,
    private routeinfo: ActivatedRoute,
    localStorageService: LocalStorageService,
    router: Router) {
    super(localStorageService, router);
    this.selectedTopic = new Topic();
  }

  ngOnInit(): void {
    if (this.user) {
      this.getTopic();
    }
  }

  getTopic() {
    this.service.getTopic(this.user.company_id).then(result => {
      if (result) {
        this.topicdata = result;
      }
    });
  }

  public editTopic(item: Topic) {
    this.router.navigate(['/topic/' + item.topic_id]);
  }

  public showTopic() {
    this.router.navigate(['/topic']);
  }

  public removeItem(item: any) {
    this.service.removeTopic(item.topic_id).then(result => {
      if (result) {
        Materialize.toast('Topic deleted!', 2000, 'rounded');
        this.getTopic();
      } else {
        Materialize.toast('Topic not deleted!', 2000, 'rounded');
      }
    });
  }
}
