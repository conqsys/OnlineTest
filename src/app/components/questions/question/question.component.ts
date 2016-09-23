import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {BaseComponent} from '../../base.component';
import { LocalStorageService } from 'angular-2-local-storage';

import {QuestionModel} from '../../../model/question/question';
import {QuestionOptionModel} from '../../../model/question/question-option';
import { TopicService } from '../../../services/topic/topic.service';
import { QuestionService } from '../../../services/question/question.service';
import { TopicModel } from '../../../model/topic/topic.model';
import { QuestionOptionService } from '../../../services/question-option/question-option.service';

declare var tinymce: any;
@Component({
  moduleId: module.id,
  selector: 'app-question',
  templateUrl: 'question.component.html',
  styleUrls: ['question.component.css']
})
export class QuestionComponent extends BaseComponent implements OnInit {
  @Input() model: QuestionModel;
  @Output()
  setQuestionVisibility: EventEmitter<boolean>;

  question_id: number;

  topics = Array<TopicModel>();
  selectedTopic: number;

  froalaOptions: any;

  private newOption: string;

  constructor(private questionService: QuestionService,
    private topicService: TopicService,
    private activatedRoute: ActivatedRoute,
    private questionOptionService: QuestionOptionService,
    localStorageService: LocalStorageService,
    router: Router) {
    super(localStorageService, router);
    this.setQuestionVisibility = new EventEmitter<boolean>();

    this.model = new QuestionModel();
    this.model.options = new Array<QuestionOptionModel>();
    this.model.answer_explanation = '';
    // this.model.question_description = "";

    this.newOption = '';
    this.model.is_multiple_option = false;
    this.model.company_id = this.user.company_id;
    this.model.created_by = this.user.user_id;
    this.model.updated_by = this.user.user_id;
    this.model.question_id = 0;

  }

  ngOnInit(): void {
    if (this.user) {
      this.initializeFloraEditor();
      this.activatedRoute.params.subscribe(params => {
        this.question_id = +params['question_id']; // (+) converts string 'id' to a number
      });

      this.getTopic();
    }
  }

  getTopic() {
    this.topicService.getTopic(this.user.company_id)
      .then(result => {
        this.topics = result;
        this.getQuestionById();
      });
  }

  getQuestionById() {
    if (this.question_id !== 0) {
      this.questionService.getQuestionById(this.question_id)
        .then(result => {
          if (result) {
            this.model = result;
          } else {
            alert('no question found');
            this.router.navigate(['/questions']);
          }
        });
    }
  }

  valueChanged(value: boolean): void {
    // alert(JSON.stringify(value));
    console.log(value);
    this.model.is_multiple_option = !this.model.is_multiple_option;
    this.model.options.forEach(function (option) {
      option.is_correct = false;
    });
  }

  // add option 
  addOption(): void {
    if (this.newOption === '') {
      alert('can not be blank');
    } else {
      this.model.options.push({ description: this.newOption, is_correct: false, option_id: 0, question_id: this.model.question_id });
      this.newOption = '';
    }
  }

  // save Question 
  saveQuestion(): void {
    this.questionService.saveQuestion(this.model)
      .then(result => {
        this.router.navigate(['/questions']);
      });
    this.setQuestionVisibility.emit(false);
  }

  // open  Question list 
  cancel(): void {
    this.router.navigate(['/questions']);
  }

  private initializeFloraEditor() {
    this.froalaOptions = {
      placeholderText: 'Edit Your Content Here!',
      charCounterCount: false,
      imageUploadURL: 'http://localhost:1337/file/upload'
    };
    //  this.model.question_description = "<p>This is my awesome content</p>";
  }
}
