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
var router_1 = require('@angular/router');
var angular_2_local_storage_1 = require('angular-2-local-storage');
var base_component_1 = require('../../base.component');
var question_set_model_1 = require('../../../model/question-set/question-set.model');
var question_set_service_1 = require('../../../services/question-set/question-set.service');
var question_service_1 = require('../../../services/question/question.service');
var topic_service_1 = require('../../../services/topic/topic.service');
var question_option_service_1 = require('../../../services/question-option/question-option.service');
var QuestionSetComponent = (function (_super) {
    __extends(QuestionSetComponent, _super);
    function QuestionSetComponent(questionSetService, questionService, topicService, questionOptionService, activatedRoute, localStorageService, router) {
        _super.call(this, localStorageService, router);
        this.questionSetService = questionSetService;
        this.questionService = questionService;
        this.topicService = topicService;
        this.questionOptionService = questionOptionService;
        this.activatedRoute = activatedRoute;
        this.questions = [];
        this.topics = [];
        this.optionSeries = [];
        this.title = 'Question Sets';
        this.model = new question_set_model_1.QuestionSet();
        this.model.question_set_questions = Array();
        this.isAddQuestion = false;
    }
    QuestionSetComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.user) {
            this.activatedRoute.params.subscribe(function (params) {
                _this.question_set_id = +params['question_set_id']; // (+) converts string 'id' to a number
            });
            this.getOptionSeries();
        }
    };
    QuestionSetComponent.prototype.getOptionSeries = function () {
        var _this = this;
        this.questionOptionService.getOptionSeries().then(function (optionSeries) {
            _this.optionSeries = optionSeries;
            if (_this.question_set_id !== 0 && _this.question_set_id !== undefined) {
                _this.getQuestionSet(_this.user.company_id, _this.question_set_id);
            }
            else {
                _this.model.question_set_id = _this.question_set_id;
                _this.model.question_set_title = '';
                _this.model.total_time = '';
                _this.model.company_id = _this.user.company_id;
                _this.model.total_questions = 0;
                _this.model.is_randomize = false;
                _this.model.option_series_id = 2;
                _this.model.question_set_questions = [];
            }
        });
    };
    // get Question Set by company_id and question_set_id
    QuestionSetComponent.prototype.getQuestionSet = function (company_id, question_set_id) {
        var _this = this;
        this.questionSetService.getQuestionSet(company_id, question_set_id)
            .then(function (questionSet) {
            _this.model = questionSet;
        });
    };
    // get topic_id by company_id then get Question by topic_id 
    QuestionSetComponent.prototype.showQuestions = function () {
        var _this = this;
        this.isAddQuestion = true;
        this.topicService.getTopic(this.user.company_id)
            .then(function (topics) {
            _this.topics = topics;
            if (_this.topics.length > 0) {
                _this.selectedTopic = _this.topics[0].topic_id;
                _this.getQuestions(_this.selectedTopic);
            }
        });
    };
    // get Question by topic_id 
    QuestionSetComponent.prototype.getQuestions = function (topic_id) {
        var _this = this;
        this.questionService.getQuestionsByTopic(topic_id)
            .then(function (questions) {
            _this.questions = [];
            var _loop_1 = function(i) {
                var selectedQuestion = _this.model.question_set_questions.filter(function (ques) { return ques.question_id === questions[i].question_id && ques.is_deleted === 0; });
                if (selectedQuestion.length === 0) {
                    _this.questions.splice(_this.questions.length, 0, questions[i]);
                }
            };
            for (var i = 0; i < questions.length; i++) {
                _loop_1(i);
            }
        });
    };
    // add Question in Question Set
    QuestionSetComponent.prototype.addQuestionsInQuestionSet = function () {
        this.isAddQuestion = false;
        var selectedQuestions = this.questions.filter(function (ques) { return ques.is_selected === true; });
        var _loop_2 = function(i) {
            var deletedQuestion = this_1.model.question_set_questions.filter(function (ques) { return ques.question_id === selectedQuestions[i].question_id; });
            if (deletedQuestion.length > 0) {
                deletedQuestion[0].is_deleted = 0;
            }
            else {
                var obj = {
                    question_set_question_id: 0,
                    question_set_id: this_1.question_set_id,
                    question_id: selectedQuestions[i].question_id,
                    question_description: selectedQuestions[i].question_description,
                    is_deleted: 0
                };
                this_1.model.question_set_questions.splice(this_1.model.question_set_questions.length, 0, obj);
            }
        };
        var this_1 = this;
        for (var i = 0; i < selectedQuestions.length; i++) {
            _loop_2(i);
        }
    };
    // save Question Set  
    QuestionSetComponent.prototype.saveQuestionSet = function () {
        var _this = this;
        this.model.created_by = this.user.user_id;
        this.model.updated_by = this.user.user_id;
        this.questionSetService.saveQuestionSet(this.model)
            .then(function (result) {
            _this.router.navigate(['/questionSets']);
        });
    };
    // delete Question set by question_id
    QuestionSetComponent.prototype.deleteSetQuestion = function (question, index) {
        if (question.question_set_question_id === 0) {
            this.model.question_set_questions.splice(index, 1);
        }
        else {
            question.is_deleted = 1;
        }
    };
    QuestionSetComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-set',
            templateUrl: 'question-set.component.html',
        }), 
        __metadata('design:paramtypes', [question_set_service_1.QuestionSetService, question_service_1.QuestionService, topic_service_1.TopicService, question_option_service_1.QuestionOptionService, router_1.ActivatedRoute, angular_2_local_storage_1.LocalStorageService, router_1.Router])
    ], QuestionSetComponent);
    return QuestionSetComponent;
}(base_component_1.BaseComponent));
exports.QuestionSetComponent = QuestionSetComponent;
//# sourceMappingURL=question-set.component.js.map