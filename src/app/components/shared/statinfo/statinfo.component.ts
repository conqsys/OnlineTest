import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import {BaseComponent} from '../../base.component';

import { StatInfo } from '../../../model/stats/stat-info.model';
import { QuestionService } from '../../../services/question/question.service';

@Component({
  moduleId: module.id,
  selector: 'app-statinfo',
  templateUrl: './statinfo.component.html',
})
export class StatinfoComponent extends BaseComponent implements OnInit {

  statInfo: StatInfo;
  //  Stats: any[] = [];
  constructor(private service: QuestionService,
    localStorageService: LocalStorageService,
    router: Router) {
    super(localStorageService, router);

  }

  ngOnInit(): void {
    if (this.user) {
      // this.getQuestionStateInfo();

    }
  }

  // getQuestionStateInfo() {
  //     this.service.getQuestionsStateInfo()
  //         .then(result => {
  //           if (result) {
  //             this.Stats = result;
  //           } 
  //         });
  //   }
}
