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
var company_1 = require('../../model/company/company');
var companyService_1 = require('../../services/company/companyService');
var CompanyComponent = (function () {
    function CompanyComponent(companyService, activatedRoute) {
        this.companyService = companyService;
        this.activatedRoute = activatedRoute;
        this.bydefault();
    }
    CompanyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramsSub = this.activatedRoute.params.subscribe(function (params) {
            _this.company_id = Number.parseInt(params['id'], 10);
            // if (this.company_id > 0)
            //   this.getCompanyByID(this.company_id);
        });
    };
    CompanyComponent.prototype.ngOnDestroy = function () {
        this.paramsSub.unsubscribe();
    };
    CompanyComponent.prototype.bydefault = function () {
        this.model = new company_1.CompanyModel();
        this.model.company_id = 0;
        this.model.company_address = "a";
        this.model.company_email = "a";
        this.model.created_by = 'Harendra Maurya';
        this.model.updated_by = 'Harendra Maurya';
    };
    CompanyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-company',
            templateUrl: 'company.component.html',
            providers: [company_1.CompanyModel, companyService_1.CompanyService]
        }), 
        __metadata('design:paramtypes', [companyService_1.CompanyService, router_1.ActivatedRoute])
    ], CompanyComponent);
    return CompanyComponent;
}());
exports.CompanyComponent = CompanyComponent;
//# sourceMappingURL=company.component.js.map