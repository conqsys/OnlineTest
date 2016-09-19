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
var OnlineTestService = (function () {
    function OnlineTestService(http) {
        this.http = http;
    }
    OnlineTestService.prototype.getQuestion = function () {
        return this.http.get(api_url_component_1.ApiUrl.baseUrl + 'getQuestions').toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    OnlineTestService.prototype.saveOnlineTest = function (onlineTest) {
        return this.http.post(api_url_component_1.ApiUrl.baseUrl + 'onlineTest', onlineTest).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    OnlineTestService.prototype.getOnlineTests = function () {
        return this.http.get(api_url_component_1.ApiUrl.baseUrl + 'getOnlineTests').toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    OnlineTestService.prototype.getOnlineTestById = function (id) {
        return this.http.get(api_url_component_1.ApiUrl.baseUrl + 'getOnlineTestById/' + id).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    OnlineTestService.prototype.removeOnlineTest = function (id) {
        return this.http.get(api_url_component_1.ApiUrl.baseUrl + 'deletetest/' + id).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    OnlineTestService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    OnlineTestService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], OnlineTestService);
    return OnlineTestService;
}());
exports.OnlineTestService = OnlineTestService;
//# sourceMappingURL=online-test.service.js.map