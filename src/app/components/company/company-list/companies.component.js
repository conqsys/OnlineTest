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
var router_1 = require('@angular/router');
var core_1 = require('@angular/core');
var base_component_1 = require('../../base.component');
var angular_2_local_storage_1 = require('angular-2-local-storage');
var companyService_1 = require('../../../services/company/companyService');
var CompaniesComponent = (function (_super) {
    __extends(CompaniesComponent, _super);
    function CompaniesComponent(companyService, localStorageService, router) {
        _super.call(this, localStorageService, router);
        this.companyService = companyService;
    }
    CompaniesComponent.prototype.ngOnInit = function () {
        if (this.user) {
            this.getCompanies();
        }
    };
    //get company details 
    CompaniesComponent.prototype.getCompanies = function () {
        var _this = this;
        this.companyService.getCompanies().then(function (result) {
            _this.model = result;
        });
    };
    // open add company page from company list
    CompaniesComponent.prototype.addCompany = function () {
        this.router.navigate(['/company']);
    };
    CompaniesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-companies',
            templateUrl: 'companies.component.html',
        }), 
        __metadata('design:paramtypes', [companyService_1.CompanyService, angular_2_local_storage_1.LocalStorageService, router_1.Router])
    ], CompaniesComponent);
    return CompaniesComponent;
}(base_component_1.BaseComponent));
exports.CompaniesComponent = CompaniesComponent;
//# sourceMappingURL=companies.component.js.map