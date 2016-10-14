import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import {BaseComponent} from '../../base.component';

import { OnlineTest } from '../../../model/online-test/online-test.model';
import { OnlineTestService } from '../../../services/online-test/online-test.service';

@Component({
  moduleId: module.id,
  selector: 'online-test-list',
  templateUrl: 'online-test-list.component.html',
})
export class OnlineTestListComponent extends BaseComponent implements OnInit {
  private onlineTestData: OnlineTest[] = [];

  constructor(private onlineTestService: OnlineTestService,
    localStorageService: LocalStorageService,
    router: Router) {
    super(localStorageService, router);
  }

  ngOnInit(): void {
    if (this.user) {
      this.getOnlineTests();
    }
  }

  getOnlineTests() {
    this.onlineTestService.getOnlineTests().then(onlineTests => {
      this.onlineTestData = onlineTests;
    });
  }

  public showTest(online_test_id: number) {
    this.router.navigate(['/onlineTest/' + online_test_id]);
  }

  public removeTest(item: OnlineTest) {
    this.onlineTestService.removeOnlineTest(item.online_test_id).then(result => {
      if (result) {
        this.getOnlineTests();
      }
    });
  }
}
