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
var contactService_1 = require('../../services/contactService');
var contactInfo_1 = require('../../model/contactInfo');
var customdirectives_1 = require('../../directives/customdirectives');
var contact_Info = (function () {
    function contact_Info(contactService) {
        this.contactService = contactService;
        this.errContactName = false;
        this.errContactNumber = false;
        this.cancel_status = true;
        this.show_status = true;
        this.updateCompanyInfo = new core_1.EventEmitter();
        this.ContactInfoDetail = new contactInfo_1.ContactInfoModel();
        this.ContactInfoDetail.IsActive = false;
        this.ContactInfoDetail.new_IsActive = false;
        this.show_status = true;
    }
    contact_Info.prototype.getParentContact = function (contact) {
        this.cancel_status = true;
        this.errContactName = false;
        this.errContactNumber = false;
        this.show_status = false;
        this.ContactInfoDetail.Con_ID = contact.Con_ID;
        this.ContactInfoDetail.Con_Name = contact.Con_Name;
        this.ContactInfoDetail.ContactNo = contact.ContactNo;
        this.ContactInfoDetail.Cmp_ID = contact.Cmp_ID;
        this.ContactInfoDetail.IsActive = contact.IsActive.data[0];
    };
    contact_Info.prototype.insert_update_contact = function (status, contact) {
        var _this = this;
        if (status == 0) {
            if (contact.Con_Name != "" && contact.ContactNo != "") {
                if (contact.Cmp_ID != null) {
                    contact.status = status;
                    this.contactService.insert_Update_Contact_info(contact).map(function (r) { return r.json(); })
                        .subscribe(function (a) {
                        _this.ContactInfoDetail.Con_Name = '';
                        _this.ContactInfoDetail.ContactNo = null;
                        //this.ContactInfoDetail.Con_ID = null;
                        _this.updateCompanyInfo.emit(a);
                    });
                }
            }
            else {
                if (contact.Con_Name == "") {
                    this.errContactName = true;
                }
                if (contact.ContactNo == "") {
                    this.errContactNumber = true;
                }
            }
        }
        else {
            if (contact.new_Con_Name != '' && contact.new_Con_Name != undefined && contact.new_Con_Name != null) {
                contact.status = status;
                contact.Cmp_ID = this.demo_Cmp_ID;
                this.contactService.insert_Update_Contact_info(contact).map(function (r) { return r.json(); })
                    .subscribe(function (a) {
                    _this.ContactInfoDetail.new_Con_Name = '';
                    _this.ContactInfoDetail.new_ContactNo = null;
                    _this.ContactInfoDetail.new_IsActive = false;
                    //   this.ContactInfoDetail.Con_ID = null;
                    _this.updateCompanyInfo.emit(a);
                });
            }
        }
    };
    //validation
    contact_Info.prototype.change_event_contact_name = function (value) {
        if (value == '') {
            this.errContactName = true;
        }
        else {
            this.errContactName = false;
        }
    };
    contact_Info.prototype.change_event_contact_number = function (value) {
        if (value == '') {
            this.errContactNumber = true;
        }
        else {
            this.errContactNumber = false;
        }
    };
    contact_Info.prototype.cancel_button = function () {
        this.show_status = true;
    };
    //receve data from contact cmponent through coompany_info
    contact_Info.prototype.sendData = function (contact) {
        this.show_status = false;
        this.cancel_status = true;
        this.errContactName = false;
        this.errContactNumber = false;
        this.ContactInfoDetail.Con_ID = contact.Con_ID;
        this.ContactInfoDetail.Con_Name = contact.Con_Name;
        this.ContactInfoDetail.ContactNo = contact.ContactNo;
        this.ContactInfoDetail.Cmp_ID = contact.Cmp_ID;
        this.demo_Cmp_ID = contact.Cmp_ID;
        this.ContactInfoDetail.IsActive = contact.IsActive.data[0];
    };
    //to receive the data from company info
    contact_Info.prototype.sendContactData_info = function (cmp_ID) {
        this.demo_Cmp_ID = cmp_ID;
    };
    contact_Info.prototype.disable_update = function () {
        this.show_status = true;
    };
    //disable contact info by default
    contact_Info.prototype.send_Contact_default_info = function () {
        this.show_status = true;
    };
    contact_Info = __decorate([
        core_1.Component({
            selector: 'my-contactInfo',
            outputs: ['updateCompanyInfo'],
            templateUrl: '../app/components/contactInfo/contact.contactInfo.html',
            directives: [customdirectives_1.NumbersOnlyDirective]
        }), 
        __metadata('design:paramtypes', [contactService_1.contactService])
    ], contact_Info);
    return contact_Info;
}());
exports.contact_Info = contact_Info;
//# sourceMappingURL=contact.contactInfo.js.map