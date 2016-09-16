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
var QuestionSetService = (function () {
    function QuestionSetService(http) {
        this.http = http;
    }
    QuestionSetService.prototype.getQuestionSets = function (company_id) {
        return this.http
            .get(api_url_component_1.ApiUrl.baseUrl + 'questionSet/' + company_id)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    QuestionSetService.prototype.getQuestionSet = function (company_id, question_set_id) {
        return this.http
            .get(api_url_component_1.ApiUrl.baseUrl + 'questionSet/' + company_id + '/' + question_set_id)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    QuestionSetService.prototype.saveQuestionSet = function (data) {
        return this.http
            .post(api_url_component_1.ApiUrl.baseUrl + 'saveQuestionSet', JSON.stringify(data), { headers: api_url_component_1.ApiUrl.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    QuestionSetService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    QuestionSetService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], QuestionSetService);
    return QuestionSetService;
}());
exports.QuestionSetService = QuestionSetService;
//# sourceMappingURL=question-set.service.js.map