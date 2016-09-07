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
var stats_component_1 = require('../shared/stats/stats.component');
var statinfo_1 = require('../../model/stats/statinfo');
var question_component_1 = require('../question/question.component');
var QuestionsComponent = (function () {
    function QuestionsComponent() {
        this.statInfo = new statinfo_1.StatInfoModel();
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
    };
    QuestionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-questions',
            templateUrl: 'questions.component.html',
            styleUrls: ['questions.component.css'],
            directives: [stats_component_1.StatsComponent, question_component_1.QuestionComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], QuestionsComponent);
    return QuestionsComponent;
}());
exports.QuestionsComponent = QuestionsComponent;
//# sourceMappingURL=questions.component.js.map