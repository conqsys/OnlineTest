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
var question_set_service_1 = require('../../../services/question-set/question-set.service');
var router_1 = require('@angular/router');
var base_component_1 = require('../../base.component');
var angular_2_local_storage_1 = require('angular-2-local-storage');
var QuestionSetListComponent = (function (_super) {
    __extends(QuestionSetListComponent, _super);
    function QuestionSetListComponent(service, localStorageService, router) {
        _super.call(this, localStorageService, router);
        this.service = service;
        this.model = [];
        this.title = 'Question Sets';
        this.model = new Array();
    }
    QuestionSetListComponent.prototype.ngOnInit = function () {
        if (this.user) {
            this.getQuestionSets();
        }
    };
    // get Question set by company_id
    QuestionSetListComponent.prototype.getQuestionSets = function () {
        var _this = this;
        this.service.getQuestionSets(this.user.company_id)
            .then(function (questionSets) {
            _this.model = questionSets;
        });
    };
    // navigate question_set_id to Question set component.ts
    QuestionSetListComponent.prototype.selectQuestionSet = function (selectedQuestionSet) {
        this.selectedQuestionSetId = selectedQuestionSet.question_set_id;
        this.router.navigate(['/questionset', this.selectedQuestionSetId]);
    };
    // open Question set page for add Questionset 
    QuestionSetListComponent.prototype.addQuestionSet = function () {
        this.router.navigate(['/questionset', 0]);
    };
    QuestionSetListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-set-list',
            templateUrl: 'question-set-list.component.html',
        }), 
        __metadata('design:paramtypes', [question_set_service_1.QuestionSetService, angular_2_local_storage_1.LocalStorageService, router_1.Router])
    ], QuestionSetListComponent);
    return QuestionSetListComponent;
}(base_component_1.BaseComponent));
exports.QuestionSetListComponent = QuestionSetListComponent;
//# sourceMappingURL=question-set-list.component.js.map