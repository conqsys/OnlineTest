"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var base_component_1 = require('../../base.component');
var angular_2_local_storage_1 = require('angular-2-local-storage');
// import {StatsComponent} from '../../shared/stats/stats.component'
var statinfo_1 = require('../../../model/stats/statinfo');
// import {QuestionComponent} from '../question/question.component';
var question_service_1 = require('../../../services/question/question.service');
var question_1 = require('../../../model/question/question');
// import {QuestionOptionModel} from '../../../model/question/question-option';
var question_option_service_1 = require('../../../services/question-option/question-option.service');
var router_1 = require('@angular/router');
var QuestionsComponent = (function (_super) {
    __extends(QuestionsComponent, _super);
    function QuestionsComponent(service, questionOptionService, localStorageService, router) {
        _super.call(this, localStorageService, router);
        this.service = service;
        this.questionOptionService = questionOptionService;
        this.Stats = [];
        this.statInfo = new statinfo_1.StatInfoModel();
        this.questionVisibility = false;
        this.model = new Array();
        this.selectedQuestion = new question_1.QuestionModel();
        this.selectedQuestion.answer_explanation = '';
        // this.statInfo.Number = 23;
        // this.statInfo.StatName = 'Users';
        // this.stats = new Array<StatInfoModel>();
        // this.stats.push(this.statInfo);
        // this.statInfo = new StatInfoModel();
        // this.statInfo.Number = 4;
        // this.statInfo.StatName = 'options';
        // this.stats.push(this.statInfo);
        // this.statInfo = new StatInfoModel();
        // this.statInfo.Number = 5;
        // this.statInfo.StatName = 'question sets';
        // this.stats.push(this.statInfo);
    }
    QuestionsComponent.prototype.ngOnInit = function () {
        if (this.user) {
            //  this.getQuestions();
            this.getQuestionStateInfo();
        }
    };
    // getQuestions() {
    //   this.service.getQuestions(this.user.company_id)
    //     .then(questions => {
    //       this.model = questions;
    //       this.getQuestionStateInfo();
    //     });
    // }
    //GET stateInfo
    QuestionsComponent.prototype.getQuestionStateInfo = function () {
        var _this = this;
        this.service.getQuestionsStateInfo(this.user.company_id)
            .then(function (result) {
            if (result) {
                _this.Stats = result;
            }
        });
    };
    // set question show or not 
    QuestionsComponent.prototype.SetQuestionVisibility = function (value) {
        this.questionVisibility = value;
    };
    // selected Question
    QuestionsComponent.prototype.selectQuestion = function (selectedQuestion) {
        this.selectedQuestion = selectedQuestion;
        this.router.navigate(['/question', selectedQuestion.question_id]);
    };
    // open question for add question 
    QuestionsComponent.prototype.addQuestion = function () {
        this.router.navigate(['/question', 0]);
    };
    QuestionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-questions',
            templateUrl: 'questions.component.html',
            styleUrls: ['questions.component.css'],
        }), 
        __metadata('design:paramtypes', [question_service_1.QuestionService, question_option_service_1.QuestionOptionService, angular_2_local_storage_1.LocalStorageService, router_1.Router])
    ], QuestionsComponent);
    return QuestionsComponent;
}(base_component_1.BaseComponent));
exports.QuestionsComponent = QuestionsComponent;
//# sourceMappingURL=questions.component.js.map