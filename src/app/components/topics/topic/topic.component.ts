import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators  } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';

import {BaseComponent} from '../../base.component';

import { Topic } from '../../../shared/model/topic/topic.model';
import { TopicService } from '../../../shared/services/topic/topic.service';
import { ActivatedRoute } from '@angular/router';

declare var Materialize: any;
@Component({
  moduleId: module.id,
  selector: 'app-topic',
  templateUrl: 'topic.component.html'
})
export class TopicComponent extends BaseComponent implements OnInit {
  model: Topic;
  btnText: string;
  topicForm: any;

  private topicId: number;

  constructor(private formBuilder: FormBuilder,
    private topicService: TopicService,
    private activatedRoute: ActivatedRoute,
    localStorageService: LocalStorageService,
    router: Router) {
    super(localStorageService, router);
    this.model = new Topic();
  }

  ngOnInit(): void {
    if (this.user) {

      this.activatedRoute.params.subscribe(params => {
        this.topicId = +params['topicId']; // (+) converts string 'id' to a number
      });
      if (this.topicId && this.topicId !== 0) {
        this.getTopicByID(this.topicId);
      }

      this.topicForm = this.formBuilder.group({
        'title': ['', [Validators.required, Validators.minLength(5)]],
      });
    }
  }

  bydefault() {

    this.btnText = 'Save Topic';
    this.model.topic_id = 0;
    this.model.topic_title = '';
    this.model.company_id = this.user.company_id;
    this.model.created_by = this.user.user_id;
    this.model.updated_by = this.user.user_id;
  }

  getTopicByID(topicId: number) {
    this.topicService.getTopicByID(topicId).then(result => {
      this.model = result[0];
      this.btnText = 'Update Topic';
    });
  }

  saveTopic() {
    if (this.topicForm.valid) {
      this.topicService.saveTopic(this.model).then(result => {
        if (result) {
          Materialize.toast(this.btnText, 1000, 'rounded');
          this.router.navigate(['/topics']);
        } else {
          // alert(result.data);
        }
      });
    }
  }
}
