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
        //this.model = new Array<CompanyModel>
        this.bydefault();
    }
    CompanyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramsSub = this.activatedRoute.params.subscribe(function (params) {
            _this.company_id = Number.parseInt(params['id'], 10);
            if (_this.company_id > 0)
                _this.getCompanyByID(_this.company_id);
        });
    };
    CompanyComponent.prototype.ngOnDestroy = function () {
        this.paramsSub.unsubscribe();
    };
    CompanyComponent.prototype.bydefault = function () {
        this.model = new company_1.CompanyModel();
        this.model.company_title = "";
        this.model.company_address = "";
        this.model.company_phone = "";
        this.model.company_url = "";
        this.model.company_email = "";
        this.model.company_hr_phone = "";
        this.model.company_hr_emailid = "";
        this.model.created_by = 'Harendra Maurya';
        this.model.updated_by = 'Harendra Maurya';
    };
    CompanyComponent.prototype.addCompany = function () {
        var _this = this;
        if (this.model.company_title == "") {
            alert("Please enter company title.");
            return;
        }
        if (this.model.company_address == "") {
            alert("Please enter company address");
            return;
        }
        if (this.model.company_phone == "") {
            alert("Please enter company phone");
            return;
        }
        if (this.model.company_url == "") {
            alert("Please enter company url.");
            return;
        }
        if (this.model.company_email == "") {
            alert("Please enter company title.");
            return;
        }
        if (this.model.company_hr_phone == "") {
            alert("Please enter company hr phone.");
            return;
        }
        if (this.model.company_hr_emailid == "") {
            alert("Please enter company hr emailID.");
            return;
        }
        this.companyService.saveCompany(this.model).then(function (result) {
            if (result) {
                alert("Company saved successfully.!");
                _this.model.company_title = "";
                _this.model.company_url = "";
                _this.model.company_address = "";
                _this.model.company_hr_emailid = "";
                _this.model.company_phone = "";
                _this.model.company_hr_phone = "";
                _this.model.company_email = "";
            }
            else {
                alert(result);
            }
        });
    };
    CompanyComponent.prototype.getCompanyByID = function (id) {
        var _this = this;
        this.companyService.getCompanyById(id).then(function (result) {
            _this.model = result;
        });
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