import { Component, OnInit } from '@angular/core';
import {StatsComponent} from '../shared/stats/stats.component'
import {StatInfoModel} from '../../model/stats/statinfo';
import {QuestionComponent} from '../question/question.component';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-questions',
  templateUrl: 'questions.component.html',
  styleUrls: ['questions.component.css'],
  directives: [StatsComponent,QuestionComponent,ROUTER_DIRECTIVES]
})
export class QuestionsComponent implements OnInit {
statInfo:StatInfoModel
stats:Array<StatInfoModel>
  constructor() {
     this.statInfo=new StatInfoModel();
      this.statInfo.Number=23;
      this.statInfo.StatName="Users";
      this.stats=new Array<StatInfoModel>();
      this.stats.push(this.statInfo);
      this.statInfo=new StatInfoModel();
       this.statInfo.Number=4;
      this.statInfo.StatName="options";
       this.stats.push(this.statInfo);
   }

  ngOnInit() {
  }

}
