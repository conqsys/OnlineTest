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
var question_set_model_1 = require('../../../model/question-set/question-set.model');
var question_set_service_1 = require('../../../services/question-set/question-set.service');
var question_service_1 = require('../../../services/question/question.service');
var topic_service_1 = require('../../../services/topic/topic.service');
var QuestionSetComponent = (function () {
    function QuestionSetComponent(questionSetService, questionService, topicService, activatedRoute, _router) {
        this.questionSetService = questionSetService;
        this.questionService = questionService;
        this.topicService = topicService;
        this.activatedRoute = activatedRoute;
        this._router = _router;
        this.questions = [];
        this.topics = [];
        this.title = 'Question Sets';
        this.model = new question_set_model_1.QuestionSetModel();
        this.model.question_set_questions = Array();
        this.placeholder = new question_set_model_1.QuestionSetModel();
        this.isAddQuestion = false;
        this.company_id = 1;
    }
    QuestionSetComponent.prototype.ngOnInit = function () {
        var _this = this;
        var subscriptions = this.activatedRoute.params.subscribe(function (params) {
            _this.question_set_id = +params['question_set_id']; // (+) converts string 'id' to a number
        });
        if (this.question_set_id != 0 && this.question_set_id != undefined) {
            this.getQuestionSet(this.company_id, this.question_set_id);
        }
        else {
            this.model.question_set_id = this.question_set_id;
            this.model.question_set_title = "";
            this.model.total_time = "";
            this.model.company_id = this.company_id;
            this.model.total_questions = 0;
            this.model.is_randomize = false;
            this.model.option_series = "Numerical Order";
            this.model.question_set_questions = [];
        }
    };
    QuestionSetComponent.prototype.getQuestionSet = function (company_id, question_set_id) {
        // this.questionSetService.getQuestionSet(company_id, question_set_id).map(r=>r.json())
        // .subscribe(result => {
        //     this.model = result;
        //     this.placeholder = result;
        // })
    };
    QuestionSetComponent.prototype.showQuestions = function () {
        this.isAddQuestion = true;
        // this.topicService.getTopic(this.company_id).map(r=>r.json())
        // .subscribe(result => {
        //     this.topics = result;
        //     if (this.topics.length > 0) {
        //         this.selectedTopic = this.topics[0].topic_id;
        //         this.getQuestions(this.selectedTopic);
        //     }
        // })
    };
    QuestionSetComponent.prototype.getQuestions = function (topic_id) {
        // this.questionService.getQuestionsByTopic(topic_id).map(r=>r.json())
        // .subscribe(result => {
        //     this.questions = [];
        //     for (var i = 0; i < result.length; i++) {
        //         var selectedQuestion = this.model.question_set_questions.filter(
        //                                 ques => ques.question_id === result[i].question_id && ques.is_deleted === 0);
        //         if(selectedQuestion.length == 0) {
        //             this.questions.splice(this.questions.length,0, result[i]);
        //         }
        //     }
        // })
    };
    QuestionSetComponent.prototype.addQuestionsInQuestionSet = function () {
        this.isAddQuestion = false;
        var selectedQuestions = this.questions.filter(function (ques) { return ques.is_selected === true; });
        for (var i = 0; i < selectedQuestions.length; i++) {
            var deletedQuestion = this.model.question_set_questions.filter(function (ques) { return ques.question_id === selectedQuestions[i].question_id; });
            if (deletedQuestion.length > 0) {
                deletedQuestion[0].is_deleted = 0;
            }
            else {
                var obj = { set_question_id: 0, question_set_id: this.question_set_id, question_id: selectedQuestions[i].question_id, question_description: selectedQuestions[i].question_description, is_deleted: 0 };
                this.model.question_set_questions.splice(this.model.question_set_questions.length, 0, obj);
            }
        }
    };
    QuestionSetComponent.prototype.saveQuestionSet = function () {
        this.model.created_by = 'admin';
        this.model.updated_by = 'admin';
        // this.questionSetService.saveQuestionSet(this.model).map(r=>r.json())
        // .subscribe(result => {
        //     this._router.navigate(['/questionsets']);
        // })
    };
    QuestionSetComponent = __decorate([
        core_1.Component({
            selector: 'question-set',
            templateUrl: '../app/components/question-sets/question-set/question-set.component.html',
            providers: [question_set_service_1.QuestionSetService, question_service_1.QuestionService, topic_service_1.TopicService]
        }), 
        __metadata('design:paramtypes', [question_set_service_1.QuestionSetService, question_service_1.QuestionService, topic_service_1.TopicService, router_1.ActivatedRoute, router_1.Router])
    ], QuestionSetComponent);
    return QuestionSetComponent;
}());
exports.QuestionSetComponent = QuestionSetComponent;
//# sourceMappingURL=question-set.component.js.map