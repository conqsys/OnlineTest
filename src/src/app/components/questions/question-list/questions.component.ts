import { Component, OnInit } from '@angular/core';
import {StatsComponent} from '../../shared/stats/stats.component'
import {StatInfoModel} from '../../../model/stats/statinfo';
import {QuestionComponent} from '../question/question.component';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { QuestionService } from '../../../services/question/question.service';
import {QuestionModel} from '../../../model/question/question';
import {QuestionOptionModel} from '../../../model/question/question-option';
import { QuestionOptionService } from '../../../services/question-option/question-option.service';


@Component({
  moduleId: module.id,
  selector: 'app-questions',
  templateUrl: 'questions.component.html',
  styleUrls: ['questions.component.css'],
  directives: [StatsComponent, QuestionComponent, ROUTER_DIRECTIVES],
  providers: [QuestionService, QuestionOptionService]
})
export class QuestionsComponent implements OnInit {
  statInfo: StatInfoModel
  stats: Array<StatInfoModel>
  model: Array<QuestionModel>
  selectedQuestion: QuestionModel;
  questionVisibility: boolean;
  constructor(private Service: QuestionService, private questionOptionService: QuestionOptionService) {
    this.statInfo = new StatInfoModel();
    this.questionVisibility = false;
    this.model = new Array<QuestionModel>();
    this.selectedQuestion = new QuestionModel();
    this.selectedQuestion.answer_explanation = "";
    this.statInfo.Number = 23;
    this.statInfo.StatName = "Users";
    this.stats = new Array<StatInfoModel>();
    this.stats.push(this.statInfo);
    this.statInfo = new StatInfoModel();
    this.statInfo.Number = 4;
    this.statInfo.StatName = "options";
    this.stats.push(this.statInfo);
  }

  ngOnInit() {
    this.Service.getQuestions(1).map(r => r.json())
      .subscribe(result => {
        this.model = result;
        this.selectedQuestion = this.model[0];
      
        this.selectedQuestion.options = new Array<QuestionOptionModel>();
      });
  }
  SetQuestionVisibility(value) {

    this.questionVisibility = value;
  }
  selectQuestion(selectedQuestion: QuestionModel) {
    this.selectedQuestion = selectedQuestion;
    this.questionOptionService.getQuestionOptions(1).map(r => r.json())
      .subscribe(result => {
        this.selectedQuestion.options = result;
        this.questionVisibility = true;
      })



  }
  addQuestion() {
    this.selectedQuestion = new QuestionModel();
    this.selectedQuestion.options = new Array<QuestionOptionModel>();
    this.selectedQuestion.is_multiple_option=false;
    this.selectedQuestion.company_id=1;
    this.selectedQuestion.created_by="admin";
    this.selectedQuestion.updated_by="admin";
    this.selectedQuestion.question_id=0;
    this.questionVisibility = true;

  }

}
