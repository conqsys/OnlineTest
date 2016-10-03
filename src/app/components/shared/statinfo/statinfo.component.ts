import { Component, Input, OnInit } from '@angular/core';
import {StatInfoModel} from '../../../model/stats/statinfo';
import { QuestionService } from '../../../services/question/question.service';
import { QuestionOptionService } from '../../../services/question-option/question-option.service';
import {BaseComponent} from '../../base.component';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router} from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'app-statinfo',
  templateUrl: './statinfo.component.html',
})
export class StatinfoComponent extends BaseComponent implements OnInit {
  
  statInfo: StatInfoModel;
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
