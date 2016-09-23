import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {BaseComponent} from '../base.component';
import { LocalStorageService } from 'angular-2-local-storage';

import { OnlineTestModel } from '../../model/online-test/online-test.model';
import { QuestionSetModel } from '../../model/question-set/question-set.model';
import { OnlineTestService } from '../../services/online-test/online-test.service';

@Component({
  moduleId: module.id,
  selector: 'online-test',
  templateUrl: 'online-test.component.html',
})
export class OnlineTestComponent extends BaseComponent implements OnInit {
  model: OnlineTestModel;
  online_test_id: number;
  paramsSub: any;
  questionSetData: Array<QuestionSetModel>;
  constructor(private service: OnlineTestService,
    private activatedRoute: ActivatedRoute,
    localStorageService: LocalStorageService,
    router: Router) {
    super(localStorageService, router);
    this.model = new OnlineTestModel();
  }

  ngOnInit() {
    if (this.user) {
      this.bydefault();
      this.paramsSub = this.activatedRoute.params.subscribe(params => {
        this.online_test_id = Number.parseInt(params['id'], 10);
        if (this.online_test_id > 0)
          this.getOnlineTestByID(this.online_test_id);
      });
    }
  }

  bydefault() {
    this.model.online_test_id = 0;
    this.model.company_id = this.user.company_id;
    this.model.online_test_title = "";
    this.model.test_start_date = "";
    this.model.test_start_time = "";
    this.model.test_end_date = "";
    this.model.test_end_time = "";
    this.model.question_set_id = 0;
    this.model.test_support_text = "";
    this.model.test_experience_years = 0;
    this.model.created_by = this.user.user_id;
    this.model.updated_by = this.user.user_id;
    this.getQuestionSet();
  }

  // get qustionset
  getQuestionSet() {
    this.service.getQuestion().then(result => {
      if (result) {
        this.questionSetData = result;
      }
    }
    )
  }
  // save test details 
  addOnlineTest() {

    this.service.saveOnlineTest(this.model).then(result => {
      if (result) {
        alert("Company saved successfully.!");
        this.router.navigate(['/onlinetestlist']);
      }
      else {
        alert(result);
      }
    });

  }
  // get test details by online_test_id 
  getOnlineTestByID(id: number) {
    this.service.getOnlineTestById(id).then(result => {
      this.model = result;
    })
  }


}