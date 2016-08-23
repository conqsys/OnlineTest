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
var companyinfo_1 = require('../../model/companyinfo');
var companyService_1 = require('../../services/companyService');
var contact_component_1 = require('../../components/contact/contact.component');
var company_info_detail = (function () {
    function company_info_detail(companyService) {
        this.companyService = companyService;
        this.contadorObjetos = [
            { name: "test1" }
        ];
        this.updateCompanyComponent = new core_1.EventEmitter();
        this.ComopayInfo = new companyinfo_1.ComopayInfoModel();
    }
    company_info_detail.prototype.update_company = function (ComopayInfo) {
        var _this = this;
        this.companyService.insert_Update_Company_info(ComopayInfo).map(function (r) { return r.json(); })
            .subscribe(function (a) {
            _this.ComopayInfo.Name = '';
            _this.ComopayInfo.Cmp_ID = '';
            _this.ComopayInfo.Phone = null;
            _this.ComopayInfo.CallCount = '';
            _this.ComopayInfo.Cmp_Contact = '';
            _this.updateCompanyComponent.emit(a);
        });
    };
    company_info_detail.prototype.insert_company = function (ComopayInfo) {
        var _this = this;
        ComopayInfo.Cmp_ID = 0;
        this.companyService.insert_Update_Company_info(ComopayInfo).map(function (r) { return r.json(); })
            .subscribe(function (a) {
            _this.ComopayInfo.Name = '';
            _this.ComopayInfo.Cmp_ID = '';
            _this.ComopayInfo.Phone = null;
            _this.ComopayInfo.CallCount = '';
            _this.ComopayInfo.Cmp_Contact = '';
            _this.ComopayInfo.new_Name = '';
            _this.ComopayInfo.new_Phone = null;
            _this.ComopayInfo.New_Cmp_ID = '';
            _this.updateCompanyComponent.emit(a);
        });
    };
    company_info_detail.prototype.sendData = function (company_info_data1, company_contact) {
        this.contact = company_info_data1[0];
        this.call = company_info_data1[1];
        //this.company_contact_detail=company_contact.Cmp_Name;
        this.company_contact_detail = this.contact;
        this.company_Call_detail = this.call;
        this.ComopayInfo.Name = company_contact.Cmp_Name;
        this.ComopayInfo.Cmp_ID = company_contact.Cmp_ID;
        this.ComopayInfo.Phone = company_contact.Cmp_Contact;
        this.ComopayInfo.CallCount = company_contact.CallCount;
        this.ComopayInfo.Cmp_Contact = company_contact.Cmp_Contact;
    };
    company_info_detail = __decorate([
        core_1.Component({
            selector: 'company-info',
            outputs: ['updateCompanyComponent'],
            directives: [contact_component_1.contact_component],
            templateUrl: '../app/components/company/company.companyInfo.html',
        }), 
        __metadata('design:paramtypes', [companyService_1.companyService])
    ], company_info_detail);
    return company_info_detail;
}());
exports.company_info_detail = company_info_detail;
//# sourceMappingURL=company.companyInfo.js.map