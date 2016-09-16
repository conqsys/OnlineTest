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
var CompanyService = (function () {
    function CompanyService(http) {
        this.http = http;
    }
    CompanyService.prototype.saveCompany = function (company) {
        return this.http.post(api_url_component_1.ApiUrl.baseUrl + 'company', company).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CompanyService.prototype.getCompanies = function () {
        return this.http.get(api_url_component_1.ApiUrl.baseUrl + 'getCompanies').toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CompanyService.prototype.getCompanyById = function (id) {
        return this.http.get(api_url_component_1.ApiUrl.baseUrl + 'getCompanyById/' + id).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CompanyService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    CompanyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CompanyService);
    return CompanyService;
}());
exports.CompanyService = CompanyService;
//# sourceMappingURL=companyService.js.map