import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../base.component';
import { LocalStorageService } from 'angular-2-local-storage';

// import {StatsComponent} from '../../shared/stats/stats.component'
import {StatInfoModel} from '../../../model/stats/statinfo';
// import {QuestionComponent} from '../question/question.component';
import { QuestionService } from '../../../services/question/question.service';
import {QuestionModel} from '../../../model/question/question';
// import {QuestionOptionModel} from '../../../model/question/question-option';
import { QuestionOptionService } from '../../../services/question-option/question-option.service';
import { Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-questions',
  templateUrl: 'questions.component.html',
  styleUrls: ['questions.component.css'],
})
export class QuestionsComponent extends BaseComponent implements OnInit {
  statInfo: StatInfoModel;
  stats: Array<StatInfoModel>;
  model: Array<QuestionModel>;
  selectedQuestion: QuestionModel;
  questionVisibility: boolean;

  constructor(private service: QuestionService,
    private questionOptionService: QuestionOptionService,
    localStorageService: LocalStorageService,
    router: Router) {
    super(localStorageService, router);
    this.statInfo = new StatInfoModel();
    this.questionVisibility = false;
    this.model = new Array<QuestionModel>();
    this.selectedQuestion = new QuestionModel();
    this.selectedQuestion.answer_explanation = '';
    this.statInfo.Number = 23;
    this.statInfo.StatName = 'Users';
    this.stats = new Array<StatInfoModel>();
    this.stats.push(this.statInfo);
    this.statInfo = new StatInfoModel();
    this.statInfo.Number = 4;
    this.statInfo.StatName = 'options';
    this.stats.push(this.statInfo);
  }

  ngOnInit(): void {
    if (this.user) {
      this.getQuestions();
    }
  }

  getQuestions() {
    this.service.getQuestions(this.user.company_id)
      .then(questions => {
        this.model = questions;
      });
  }

  // set question show or not 
  SetQuestionVisibility(value: boolean): void {

    this.questionVisibility = value;
  }
  // selected Question
  selectQuestion(selectedQuestion: QuestionModel): void {
    this.selectedQuestion = selectedQuestion;

    this.router.navigate(['/question', selectedQuestion.question_id]);
  }

  // open question for add question 
  addQuestion(): void {
    this.router.navigate(['/question', 0]);
  }

}
