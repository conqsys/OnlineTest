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
var statinfo_1 = require('../../../model/stats/statinfo');
var question_service_1 = require('../../../services/question/question.service');
var question_1 = require('../../../model/question/question');
var question_option_service_1 = require('../../../services/question-option/question-option.service');
var router_1 = require('@angular/router');
var QuestionsComponent = (function () {
    function QuestionsComponent(Service, questionOptionService, router) {
        this.Service = Service;
        this.questionOptionService = questionOptionService;
        this.router = router;
        this.statInfo = new statinfo_1.StatInfoModel();
        this.questionVisibility = false;
        this.model = new Array();
        this.selectedQuestion = new question_1.QuestionModel();
        this.selectedQuestion.answer_explanation = "";
        this.statInfo.Number = 23;
        this.statInfo.StatName = "Users";
        this.stats = new Array();
        this.stats.push(this.statInfo);
        this.statInfo = new statinfo_1.StatInfoModel();
        this.statInfo.Number = 4;
        this.statInfo.StatName = "options";
        this.stats.push(this.statInfo);
    }
    QuestionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.Service.getQuestions(1)
            .then(function (questions) {
            _this.model = questions;
        });
        // this.Service.getQuestions(1).then()
        //   .subscribe(result => {
        //     this.model = result;
        //     this.selectedQuestion = this.model[0];
        //     this.selectedQuestion.options = new Array<QuestionOptionModel>();
        //   });
    };
    QuestionsComponent.prototype.SetQuestionVisibility = function (value) {
        this.questionVisibility = value;
    };
    QuestionsComponent.prototype.selectQuestion = function (selectedQuestion) {
        this.selectedQuestion = selectedQuestion;
        this.router.navigate(['/question', selectedQuestion.question_id]);
    };
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
        __metadata('design:paramtypes', [question_service_1.QuestionService, question_option_service_1.QuestionOptionService, router_1.Router])
    ], QuestionsComponent);
    return QuestionsComponent;
}());
exports.QuestionsComponent = QuestionsComponent;
//# sourceMappingURL=questions.component.js.map