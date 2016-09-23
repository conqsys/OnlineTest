import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../base.component';
import { LocalStorageService } from 'angular-2-local-storage';

import { TopicModel } from '../../model/topic/topic.model';
import { TopicService } from '../../services/topic/topic.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, Validators  } from '@angular/forms';
// import { ControlMessages } from '../../Components/validation/control-messages.component';
// import { ValidationService } from '../../services/validation/validation.service';
declare var Materialize: any;
@Component({
  moduleId: module.id,
  selector: 'app-topic',
  templateUrl: 'topic.component.html'
})
export class TopicComponent extends BaseComponent implements OnInit {
  model: TopicModel;
  btnText: string;
  topicForm: any;
  constructor(private formBuilder: FormBuilder,
    private service: TopicService,
    private routeinfo: ActivatedRoute,
    localStorageService: LocalStorageService,
    router: Router) {
    super(localStorageService, router);
  }

  ngOnInit(): void {
    if (this.user) {
      this.bydefault();
      this.getTopicByID(this.routeinfo.params);

      this.topicForm = this.formBuilder.group({
        'title': ['', [Validators.required, Validators.minLength(5)]],
        // 'email': ['', [Validators.required, ValidationService.emailValidator]],
        // 'profile': ['', [Validators.required, Validators.minLength(10)]]
      });
    }
  }

  // create default object for save topic
  bydefault() {
    this.model = new TopicModel();
    this.btnText = 'Save Topic';
    this.model.topic_id = 0;
    this.model.topic_title = "";
    this.model.company_id = this.user.company_id;
    this.model.created_by = this.user.user_id;
    this.model.updated_by = this.user.user_id;
  }
  // get Topic by topic_id
  getTopicByID(param: any) {
    if (param.value.id != undefined) {
      this.service.getTopicByID(param.value.id).then(result => {
        this.model = result[0];
        this.btnText = 'Update Topic';
      });
    }
  }

  // save topic 
  saveTopic() {
    if (this.topicForm.valid) {
      this.model.company_id = this.user.company_id;
      this.service.saveTopic(this.model).then(result => {
        if (result) {
          Materialize.toast(this.btnText, 1000, 'rounded');
          this.router.navigate(['/topiclist']);

        } else {
          // alert(result.data);
        }
      });
    }
  }
}
