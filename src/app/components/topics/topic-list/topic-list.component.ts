import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import { BaseComponent } from '../../base.component';

import { Topic } from '../../../shared/model/topic/topic.model';
import { TopicService } from '../../../shared/services/topic/topic.service';

declare var Materialize: any;

@Component({
  moduleId: module.id,
  selector: 'app-topiclist',
  templateUrl: 'topic-list.component.html',
})
export class TopicListComponent extends BaseComponent implements OnInit {
  private selectedTopic: Topic;
  private model: Topic[] = [];
  constructor(private topicService: TopicService,
    localStorageService: LocalStorageService,
    router: Router) {
    super(localStorageService, router);
    this.selectedTopic = new Topic();
    this.model = new Array<Topic>();
  }

  ngOnInit(): void {
    if (this.user) {
      this.getTopic();
    }
  }

  editTopic(topicId: number) {
    this.router.navigate(['/topic/' + topicId]);
  }

  showTopic() {
    this.router.navigate(['/topic/0']);
  }

  removeItem(item: Topic) {
    this.topicService.removeTopic(item.topic_id).then(result => {
      if (result) {
        Materialize.toast('Topic deleted!', 2000, 'rounded');
        this.getTopic();
      } else {
        Materialize.toast('Topic not deleted!', 2000, 'rounded');
      }
    });
  }

  private getTopic() {
    this.topicService.getTopic().then(result => {
      if (result) {
        this.model = result;
      }
    });
  }
}
