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
var question_set_service_1 = require('../../../services/question-set/question-set.service');
var router_1 = require('@angular/router');
var QuestionSetListComponent = (function () {
    function QuestionSetListComponent(service, router) {
        this.service = service;
        this.router = router;
        this.model = [];
        this.title = 'Question Sets';
        this.model = new Array();
        this.company_id = 1;
    }
    QuestionSetListComponent.prototype.ngOnInit = function () {
        this.getQuestionSets(this.company_id);
    };
    QuestionSetListComponent.prototype.getQuestionSets = function (company_id) {
        var _this = this;
        this.service.getQuestionSets(company_id)
            .then(function (questionSets) {
            _this.model = questionSets;
        });
    };
    QuestionSetListComponent.prototype.selectQuestionSet = function (selectedQuestionSet) {
        this.selectedQuestionSetId = selectedQuestionSet.question_set_id;
        this.router.navigate(['/questionset', this.selectedQuestionSetId]);
    };
    QuestionSetListComponent.prototype.addQuestionSet = function () {
        this.router.navigate(['/questionset', 0]);
    };
    QuestionSetListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-set-list',
            templateUrl: 'question-set-list.component.html',
        }), 
        __metadata('design:paramtypes', [question_set_service_1.QuestionSetService, router_1.Router])
    ], QuestionSetListComponent);
    return QuestionSetListComponent;
}());
exports.QuestionSetListComponent = QuestionSetListComponent;
//# sourceMappingURL=question-set-list.component.js.map