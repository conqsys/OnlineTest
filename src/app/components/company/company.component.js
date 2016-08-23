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
var companyService_1 = require('../../services/companyService');
var company_companyInfo_1 = require('../companyInfo/company.companyInfo');
var company_1 = require('../../model/company');
var call_component_1 = require('../call/call.component');
var customdirectives_1 = require('../../directives/customdirectives');
var company_info = (function () {
    function company_info(companyService) {
        var _this = this;
        this.companyService = companyService;
        this.errCompanyNumber = false;
        this.errCompanyName = false;
        this.ComopayComponent = new company_1.ComopayComponentModel();
        companyService.getCompany().map(function (r) { return r.json(); })
            .subscribe(function (a) {
            _this.data = a;
        });
    }
    company_info.prototype.UpdateCompanyComponent = function (cmp_id) {
        var _this = this;
        this.companyService.getCompany().map(function (r) { return r.json(); })
            .subscribe(function (a) {
            _this.data = a;
        });
    };
    //to enable company infornation
    company_info.prototype.show_company_info = function (data) {
        var _this = this;
        this.show_data = data;
        this.companyService.getCompany_info(data.Cmp_ID).map(function (r) { return r.json(); })
            .subscribe(function (a) {
            _this.companyInfo = a;
            var company_contact = _this.company_info_data.sendData(a, data, data.Cmp_ID);
        });
    };
    company_info.prototype.sntCntctCmpToCountryCmp = function (company_info) {
        var _this = this;
        this.companyService.getCompany().map(function (r) { return r.json(); })
            .subscribe(function (a) {
            _this.data = a;
        });
    };
    //validation
    company_info.prototype.change_event_company_name = function (value) {
        if (value == '') {
            this.errCompanyName = true;
        }
        else {
            this.errCompanyName = false;
        }
    };
    company_info.prototype.change_event_company_number = function (value) {
        if (value == '') {
            this.errCompanyNumber = true;
        }
        else {
            this.errCompanyNumber = false;
        }
    };
    __decorate([
        core_1.ViewChild(company_companyInfo_1.company_info_detail), 
        __metadata('design:type', company_companyInfo_1.company_info_detail)
    ], company_info.prototype, "company_info_data", void 0);
    __decorate([
        core_1.ViewChild(call_component_1.call), 
        __metadata('design:type', call_component_1.call)
    ], company_info.prototype, "call_info_data", void 0);
    company_info = __decorate([
        core_1.Component({
            selector: 'my-company',
            templateUrl: '../app/components/company/company.component.html',
            directives: [company_companyInfo_1.company_info_detail, customdirectives_1.NumbersOnlyDirective],
            styleUrls: ['../app/stylesheet/company.css'],
        }), 
        __metadata('design:paramtypes', [companyService_1.companyService])
    ], company_info);
    return company_info;
}());
exports.company_info = company_info;
//# sourceMappingURL=company.component.js.map