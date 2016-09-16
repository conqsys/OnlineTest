"use strict";
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
var question_1 = require('../../../model/question/question');
var topic_service_1 = require('../../../services/topic/topic.service');
var question_service_1 = require('../../../services/question/question.service');
var question_option_service_1 = require('../../../services/question-option/question-option.service');
var QuestionComponent = (function () {
    // text: string = '<div>Hey we are testing Froala Editor</div>';
    //   editor: any;
    //   froalaOptions: any = {
    //     height: 300
    //   };
    function QuestionComponent(questionService, topicService, activatedRoute, questionOptionService, _router) {
        this.questionService = questionService;
        this.topicService = topicService;
        this.activatedRoute = activatedRoute;
        this.questionOptionService = questionOptionService;
        this._router = _router;
        this.topics = Array();
        this.setQuestionVisibility = new core_1.EventEmitter();
        this.model = new question_1.QuestionModel();
        this.model.options = new Array();
        this.model.answer_explanation = "";
        this.model.question_description = "";
        this.company_id = 1;
        this.newOption = "";
        this.model.is_multiple_option = false;
        this.model.company_id = 1;
        this.model.created_by = "admin";
        this.model.updated_by = "admin";
        this.model.question_id = 0;
    }
    QuestionComponent.prototype.valueChanged = function (value) {
        // alert(JSON.stringify(value));
        console.log(value);
        this.model.is_multiple_option = !this.model.is_multiple_option;
        this.model.options.forEach(function (option) {
            option.is_correct = false;
        });
    };
    QuestionComponent.prototype.addOption = function () {
        if (this.newOption === "")
            alert("can not be blank");
        else
            this.model.options.push({ description: this.newOption, is_correct: false, option_id: 0, question_id: this.model.question_id });
        this.newOption = "";
    };
    QuestionComponent.prototype.ngOnInit = function () {
        var _this = this;
        var subscriptions = this.activatedRoute.params.subscribe(function (params) {
            _this.question_id = +params['question_id']; // (+) converts string 'id' to a number
        });
        if (this.question_id !== 0) {
            this.questionService.getQuestionById(this.question_id)
                .then(function (result) {
                _this.model = result;
            });
        }
        this.topicService.getTopic(this.company_id)
            .then(function (result) {
            _this.topics = result;
            if (_this.topics.length > 0) {
            }
        });
    };
    // FileChanged(value)
    // {
    //   alert(value);
    //   $('#my_form').submit();
    // }
    QuestionComponent.prototype.saveQuestion = function () {
        var _this = this;
        this.questionService.saveQuestion(this.model)
            .then(function (result) {
            _this._router.navigate(['/questions']);
        });
        this.setQuestionVisibility.emit(false);
    };
    QuestionComponent.prototype.cancel = function () {
        this._router.navigate(['/questions']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', question_1.QuestionModel)
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
        __metadata('design:paramtypes', [question_service_1.QuestionService, topic_service_1.TopicService, router_1.ActivatedRoute, question_option_service_1.QuestionOptionService, router_1.Router])
    ], QuestionComponent);
    return QuestionComponent;
}());
exports.QuestionComponent = QuestionComponent;
//# sourceMappingURL=question.component.js.map