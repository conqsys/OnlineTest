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
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var api_url_component_1 = require('../../shared/api-url.component');
var QuestionOptionService = (function () {
    function QuestionOptionService(http) {
        this.http = http;
    }
    QuestionOptionService.prototype.getQuestionOptions = function (question_id) {
        return this.http.get(api_url_component_1.ApiUrl.baseUrl + 'questionoptions/' + question_id);
    };
    QuestionOptionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], QuestionOptionService);
    return QuestionOptionService;
}());
exports.QuestionOptionService = QuestionOptionService;
//# sourceMappingURL=question-option.service.js.map