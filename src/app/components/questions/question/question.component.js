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
var question_model_1 = require('../../../model/question/question.model');
var topic_service_1 = require('../../../services/topic/topic.service');
var question_service_1 = require('../../../services/question/question.service');
var question_option_service_1 = require('../../../services/question-option/question-option.service');
var QuestionComponent = (function (_super) {
    __extends(QuestionComponent, _super);
    function QuestionComponent(questionService, topicService, activatedRoute, questionOptionService, localStorageService, router) {
        _super.call(this, localStorageService, router);
        this.questionService = questionService;
        this.topicService = topicService;
        this.activatedRoute = activatedRoute;
        this.questionOptionService = questionOptionService;
        this.topics = Array();
        this.setQuestionVisibility = new core_1.EventEmitter();
        this.model = new question_model_1.Question();
        this.model.options = new Array();
        this.model.answer_explanation = '';
        this.newOption = '';
        this.model.is_multiple_option = false;
        this.model.company_id = this.user.company_id;
        this.model.created_by = this.user.user_id;
        this.model.updated_by = this.user.user_id;
        this.model.question_id = 0;
    }
    QuestionComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.user) {
            this.initializeFloraEditor();
            this.activatedRoute.params.subscribe(function (params) {
                _this.question_id = +params['question_id']; // (+) converts string 'id' to a number
            });
            this.getTopic();
        }
    };
    QuestionComponent.prototype.getTopic = function () {
        var _this = this;
        this.topicService.getTopic(this.user.company_id)
            .then(function (result) {
            _this.topics = result;
            _this.getQuestionById();
        });
    };
    QuestionComponent.prototype.getQuestionById = function () {
        var _this = this;
        if (this.question_id !== 0) {
            this.questionService.getQuestionById(this.question_id)
                .then(function (result) {
                if (result) {
                    _this.model = result;
                }
                else {
                    alert('no question found');
                    _this.router.navigate(['/questions']);
                }
            });
        }
    };
    QuestionComponent.prototype.valueChanged = function (value) {
        this.model.is_multiple_option = !this.model.is_multiple_option;
        this.model.options.forEach(function (option) {
            option.is_correct = false;
        });
    };
    // add option 
    QuestionComponent.prototype.addOption = function () {
        if (this.newOption === '') {
            alert('can not be blank');
        }
        else {
            this.model.options.push({ description: this.newOption, is_correct: false, option_id: 0, question_id: this.model.question_id });
            this.newOption = '';
        }
    };
    // save Question 
    QuestionComponent.prototype.saveQuestion = function () {
        var _this = this;
        this.questionService.saveQuestion(this.model)
            .then(function (result) {
            _this.router.navigate(['/questions']);
        });
        this.setQuestionVisibility.emit(false);
    };
    // open  Question list 
    QuestionComponent.prototype.cancel = function () {
        this.router.navigate(['/questions']);
    };
    QuestionComponent.prototype.initializeFloraEditor = function () {
        this.froalaOptions = {
            placeholderText: 'Edit Your Content Here!',
            charCounterCount: false,
            imageUploadURL: 'http://localhost:1337/file/upload'
        };
        //  this.model.question_description = "<p>This is my awesome content</p>";
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', question_model_1.Question)
    ], QuestionComponent.prototype, "model", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], QuestionComponent.prototype, "setQuestionVisibility", void 0);
    QuestionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-question',
            templateUrl: 'question.component.html',
            styleUrls: ['question.component.css']
        }), 
        __metadata('design:paramtypes', [question_service_1.QuestionService, topic_service_1.TopicService, router_1.ActivatedRoute, question_option_service_1.QuestionOptionService, angular_2_local_storage_1.LocalStorageService, router_1.Router])
    ], QuestionComponent);
    return QuestionComponent;
}(base_component_1.BaseComponent));
exports.QuestionComponent = QuestionComponent;
//# sourceMappingURL=question.component.js.map