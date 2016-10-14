import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import { BaseComponent } from '../../base.component';

import { StatInfo } from '../../../shared/model/stats/stat-info.model';
import { Question } from '../../../shared/model/question/question.model';

import { QuestionService } from '../../../shared/services/question/question.service';
import { QuestionOptionService } from '../../../shared/services/question-option/question-option.service';

@Component({
  moduleId: module.id,
  selector: 'app-questions',
  templateUrl: 'question-list.component.html',
  styleUrls: ['question-list.component.css'],
})
export class QuestionListComponent extends BaseComponent implements OnInit {
  statInfo: StatInfo;
  stats: StatInfo[] = [];
  model: Question[] = [];
  selectedQuestion: Question;
  questionVisibility: boolean;

  constructor(private questionService: QuestionService,
    private questionOptionService: QuestionOptionService,
    localStorageService: LocalStorageService,
    router: Router) {
    super(localStorageService, router);
    this.statInfo = new StatInfo();
    this.questionVisibility = false;
    this.model = new Array<Question>();
    this.selectedQuestion = new Question();
    this.selectedQuestion.answer_explanation = '';
  }

  ngOnInit(): void {
    if (this.user) {
      this.getQuestionStateInfo();
    }
  }

  getQuestionStateInfo() {
    this.questionService
      .getQuestionsStateInfo(this.user.company_id)
      .then(result => {
        if (result) {
          this.model = result;
        }
      });
  }

  SetQuestionVisibility(value: boolean): void {
    this.questionVisibility = value;
  }

  selectQuestion(selectedQuestion: Question): void {
    this.selectedQuestion = selectedQuestion;
    this.router.navigate(['/question', selectedQuestion.question_id]);
  }

  addQuestion(): void {
    this.router.navigate(['/question', 0]);
  }
}
