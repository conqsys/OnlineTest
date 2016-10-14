import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import { BaseComponent } from '../../base.component';

import { OnlineTest, OnlineTestUser } from '../../../model/online-test/online-test.model';
import { QuestionSet } from '../../../model/question-set/question-set.model';

import { OnlineTestService } from '../../../services/online-test/online-test.service';
import { QuestionSetService } from '../../../services/question-set/question-set.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  moduleId: module.id,
  selector: 'online-test',
  templateUrl: 'online-test.component.html',
})
export class OnlineTestComponent extends BaseComponent implements OnInit {
  model: OnlineTest;
  online_test_id: number;

  questionSets: QuestionSet[] = [];
  onlineTestUsers: OnlineTestUser[] = [];
  users: OnlineTestUser[] = [];

  isAddTestUser: boolean;

  constructor(private onlineTestService: OnlineTestService,
    private questionSetService: QuestionSetService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    localStorageService: LocalStorageService,
    router: Router) {
    super(localStorageService, router);
    this.model = new OnlineTest();
    this.isAddTestUser = true;
  }

  ngOnInit() {
    if (this.user) {
      this.activatedRoute.params.subscribe(params => {
        this.online_test_id = Number.parseInt(params['online_test_id'], 10);
      });
      this.getQuestionSet();
    }
  }

  initializeModel() {
    this.model.company_id = this.user.company_id;
    this.model.created_by = this.user.user_id;
    this.model.updated_by = this.user.user_id;

    this.model.onlineTestUsers = new Array<OnlineTestUser>();
  }

  getQuestionSet() {
    this.questionSetService.getQuestionSets(this.user.company_id).then(questionSets => {
      if (questionSets) {
        this.questionSets = questionSets;

        if (this.online_test_id > 0) {
          this.getOnlineTest(this.online_test_id);
        } else {
          this.initializeModel();
        }
      }
    });
  }

  getOnlineTest(online_test_id: number) {
    this.onlineTestService.getOnlineTest(online_test_id, this.user.company_id).then(result => {
      this.model = result;

      this.users = this.model.onlineTestUsers.filter(user => +user.is_selected === 0);
      this.onlineTestUsers = this.model.onlineTestUsers.filter(user => +user.is_selected === 1);
    });
  }

  addTestUser() {
    this.isAddTestUser = false;
    let deletedUsers = this.onlineTestUsers.filter(user => user.is_deleted === 1 && +user.is_selected === 0);
    for (let i = 0; i < deletedUsers.length; i++) {
      this.users.splice(this.users.length, 0, deletedUsers[i]);
    }
  }

  insertTestUser() {
    this.isAddTestUser = true;
    let users = this.users.filter(user => +user.is_selected === 1);
    this.users = this.users.filter(user => +user.is_selected === 0);

    for (let i = 0; i < users.length; i++) {
      let testUser = this.onlineTestUsers.filter(user => user.user_id === users[i].user_id);
      if (!testUser[0]) {
        users[0].is_deleted = 0;
        users[i].is_selected = users[i].is_selected ? 1 : 0;
        this.onlineTestUsers.splice(this.onlineTestUsers.length, 0, users[i]);
      }
    }
  }

  deleteOnlineTestUser(user: OnlineTestUser, index: number): void {
    user.is_selected = 0;
    if (user.online_test_user_id === 0) {
      user.is_deleted = 0;
      this.users.splice(this.users.length, 0, user);
      this.onlineTestUsers.splice(index, 1);
    } else {
      user.is_deleted = 1;
    }
  }

  saveOnlineTest() {

    this.onlineTestService.saveOnlineTest(this.model).then(result => {
      if (result) {
        this.router.navigate(['/onlinetestlist']);
      }
    });
  }


}
