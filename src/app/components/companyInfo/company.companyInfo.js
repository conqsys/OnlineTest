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
var call_component_1 = require('../call/call.component');
var contact_component_1 = require('../../components/contact/contact.component');
var contact_contactInfo_1 = require('../../components/contactInfo/contact.contactInfo');
var customdirectives_1 = require('../../directives/customdirectives');
var call_callInfo_1 = require('../callInfo/call.callInfo');
var companyinfo_1 = require('../../model/companyinfo');
var call_1 = require('../../model/call');
var company_info_detail = (function () {
    function company_info_detail(companyService, callModel) {
        this.companyService = companyService;
        this.callModel = callModel;
        this.errCompanyName = false;
        this.errCompanyName_insert = false;
        this.errCompanyPhone = false;
        this.errComperrCompanyName_insert = false;
        this.showCompanyDetail = true;
        this.is_Show = false;
        //for tab routing
        this.contadorObjetos = [
            { name: "test1" }
        ];
        this.updateCompanyComponent = new core_1.EventEmitter();
        this.sntCntctCmpToCountryCmp = new core_1.EventEmitter();
        this.sntCllCmpToCountryCmp = new core_1.EventEmitter();
        this.updateCompanyCall = new core_1.EventEmitter();
        this.callModel = new call_1.CallModel();
        this.ComopayInfo = new companyinfo_1.ComopayInfoModel();
        // this.CallInfo.demo_test();
    }
    company_info_detail.prototype.insert_update_company = function (status, ComopayInfo_data) {
        var _this = this;
        if (status == 0) {
            ComopayInfo_data.status = status;
            if ((ComopayInfo_data.Name != "") && (ComopayInfo_data.Name != null) && (ComopayInfo_data.Name != undefined)) {
                this.companyService.insert_Update_Company_info(ComopayInfo_data).map(function (r) { return r.json(); })
                    .subscribe(function (a) {
                    _this.ComopayInfo.Name = '';
                    _this.is_Show = true;
                    // this.ComopayInfo.Cmp_ID = '';
                    _this.ComopayInfo.Phone = null;
                    _this.ComopayInfo.CallCount = '';
                    _this.ComopayInfo.Cmp_Contact = '';
                    _this.updateCompanyComponent.emit(a);
                });
            }
            else {
            }
        }
        else {
            ComopayInfo_data.status = status;
            if (ComopayInfo_data.new_Name != undefined && ComopayInfo_data.new_Name != null && ComopayInfo_data.new_Name != '') {
                this.errComperrCompanyName_insert = false;
                this.companyService.insert_Update_Company_info(ComopayInfo_data).map(function (r) { return r.json(); })
                    .subscribe(function (a) {
                    _this.ComopayInfo.new_Name = '';
                    _this.ComopayInfo.new_Phone = null;
                    _this.updateCompanyComponent.emit(a);
                });
            }
            else {
                this.errComperrCompanyName_insert = true;
            }
        }
    };
    company_info_detail.prototype.sendData = function (company_info_data1, company_contact, cmpId) {
        this.is_Show = false;
        this.contact_info_detail.send_Contact_default_info();
        this.CallInfo.send_call_default_info();
        this.showCompanyDetail = false;
        this.errComperrCompanyName_insert = false;
        this.errCompanyName = false;
        this.errCompanyPhone = false;
        this.contact = company_info_data1[0];
        this.call = company_info_data1[1];
        this.ComopayInfo.get_company_Cmp_Name = company_contact.Cmp_Name;
        this.ComopayInfo.get_company_Cmp_Contact = company_contact.Cmp_Contact;
        this.ComopayInfo.get_company_Cmp_ID = company_contact.Cmp_ID;
        this.ComopayInfo.Name = company_contact.Cmp_Name;
        this.ComopayInfo.Cmp_ID = company_contact.Cmp_ID;
        this.ComopayInfo.Phone = company_contact.Cmp_Contact;
        this.ComopayInfo.CallCount = company_contact.CallCount;
        this.ComopayInfo.Cmp_Contact = company_contact.Cmp_Contact;
        this.contact_info_data.sendContactData(this.contact, cmpId);
        this.contact_info_detail.sendContactData_info(cmpId);
        this.call_info_data.sendCallData(this.call, cmpId);
        this.CallInfo.getcontactlist(company_contact);
    };
    company_info_detail.prototype.updateCompanyInfo = function (company_info_data) {
        if (company_info_data.id != 0) {
            this.contact_info_data.senddata(company_info_data);
            this.CallInfo.getcontactlist(company_info_data);
        }
        else {
            this.sntCntctCmpToCountryCmp.emit(company_info_data);
            this.contact_info_data.senddata(company_info_data);
            this.CallInfo.getcontactlist(company_info_data);
        }
        // this.sntCntctCmpToCountryCmp.emit(company_info_data);
    };
    company_info_detail.prototype.updateParentComponent = function (a) {
        this.sntCllCmpToCountryCmp.emit(a);
    };
    //to get  data from contact_component and send it contact_Info
    company_info_detail.prototype.getContactForparent = function (contact_detail) {
        this.contact_info_detail.sendData(contact_detail);
        // this.CallInfo.getcontactlist(contact_detail);
    };
    //to get call from call component
    company_info_detail.prototype.companyInfoDetail = function (companyInfoDetail) {
        this.CallInfo.sendDataTOcallInfo(companyInfoDetail);
    };
    //validation
    company_info_detail.prototype.change_event_company_name = function (value) {
        if (value == '') {
            this.errCompanyName = true;
        }
        else {
            this.errCompanyName = false;
        }
    };
    company_info_detail.prototype.change_event_company_name_insert = function (value) {
        if (value == '') {
            this.errComperrCompanyName_insert = true;
        }
        else {
            this.errComperrCompanyName_insert = false;
        }
    };
    company_info_detail.prototype.change_event_company_Phone = function (value) {
        if (value == '') {
            this.errCompanyPhone = true;
        }
        else {
            this.errCompanyPhone = false;
        }
    };
    company_info_detail.prototype.cancel_button = function () {
        this.showCompanyDetail = true;
    };
    company_info_detail.prototype.popup_insert__button = function () {
        this.showCompanyDetail = true;
    };
    company_info_detail.prototype.updateCallComponent = function (data) {
        this.updateCompanyCall.emit(data);
        this.call_info_data.updateCall(data);
    };
    __decorate([
        core_1.ViewChild(call_component_1.call), 
        __metadata('design:type', call_component_1.call)
    ], company_info_detail.prototype, "call_info_data", void 0);
    __decorate([
        core_1.ViewChild(contact_component_1.contact_component), 
        __metadata('design:type', contact_component_1.contact_component)
    ], company_info_detail.prototype, "contact_info_data", void 0);
    __decorate([
        core_1.ViewChild(contact_contactInfo_1.contact_Info), 
        __metadata('design:type', contact_contactInfo_1.contact_Info)
    ], company_info_detail.prototype, "contact_info_detail", void 0);
    __decorate([
        core_1.ViewChild(call_callInfo_1.CallInfo), 
        __metadata('design:type', call_callInfo_1.CallInfo)
    ], company_info_detail.prototype, "CallInfo", void 0);
    company_info_detail = __decorate([
        core_1.Component({
            selector: 'company-info',
            outputs: ['updateCompanyComponent', 'sntCntctCmpToCountryCmp', 'sntCllCmpToCountryCmp', 'updateCompanyCall'],
            providers: [call_1.CallModel],
            directives: [contact_component_1.contact_component, call_component_1.call, customdirectives_1.NumbersOnlyDirective, contact_contactInfo_1.contact_Info, call_callInfo_1.CallInfo],
            templateUrl: '../app/components/companyInfo/company.companyInfo.html',
        }), 
        __metadata('design:paramtypes', [companyService_1.companyService, call_1.CallModel])
    ], company_info_detail);
    return company_info_detail;
}());
exports.company_info_detail = company_info_detail;
//# sourceMappingURL=company.companyInfo.js.map