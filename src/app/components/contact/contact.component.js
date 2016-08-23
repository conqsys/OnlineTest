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
var common_1 = require("@angular/common");
var contactService_1 = require('../../services/contactService');
var contact_1 = require('../../model/contact');
var ng2_select_1 = require('ng2-select');
var contact_contactInfo_1 = require('../contactInfo/contact.contactInfo');
var customdirectives_1 = require('../../directives/customdirectives');
var contact_component = (function () {
    function contact_component(contactService) {
        this.contactService = contactService;
        this.showContactDetail = false;
        this.value = {};
        this._disabledV = '0';
        this.disabled = false;
        this.errContactName = false;
        this.errContactNumber = false;
        this.ContactDetail = new contact_1.ContactModel();
        this.updateCompanyInfo = new core_1.EventEmitter();
        this.getContactForparent = new core_1.EventEmitter();
        this.ContactDetail.new_IsActive = false;
        this.items = [];
        this.aminities = [];
    }
    //getting the call from parent element
    contact_component.prototype.sendContactData = function (contact, cmpId) {
        this.Cmp_ID = cmpId;
        this.errContactName = false;
        if (contact.length != 0) {
            this.ContactDetail.company_contact_detail = contact;
            this.ContactDetail.Cmp_ID = contact.Cmp_ID;
            this.text = contact.ContactNo;
            for (this.i = 0; this.i < contact.length; this.i++) {
                this.items.push(contact[this.i].ContactNo);
            }
        }
        else {
            this.ContactDetail.company_contact_detail = null;
        }
    };
    //sending call for child element
    contact_component.prototype.updateContactinfo = function (contact) {
        if (this.showContactDetail) {
            // if (this.show_data.Con_ID == contact.Con_ID) {
            //   this.showContactDetail = false;
            // }
            // else {
            //this.show_data = contact;
            this.getContactForparent.emit(contact);
            //this.contact_info_data.getParentContact(contact);
            this.show_data = contact;
            this.contact_info_data.getParentContact(contact);
        }
        else {
            // this.show_data = contact;
            this.showContactDetail = true;
            this.getContactForparent.emit(contact);
        }
    };
    //inserting new contact
    contact_component.prototype.insert_contact = function (ContactDetail) {
        var _this = this;
        if ((ContactDetail.new_Contact != undefined && ContactDetail.new_Phone != undefined) && (ContactDetail.new_Contact != null && ContactDetail.new_Phone != null) && (ContactDetail.new_Contact != '' && ContactDetail.new_Phone != '')) {
            ContactDetail.Con_ID = 0;
            ContactDetail.Cmp_ID = this.Cmp_ID;
            this.errContactName = false;
            this.contactService.insert_Update_Contact_info(ContactDetail).map(function (r) { return r.json(); })
                .subscribe(function (a) {
                _this.dup_cmpID = a;
                _this.ContactDetail.Cmp_ID = null;
                _this.ContactDetail.Con_ID = null;
                _this.ContactDetail.new_Contact = '';
                _this.ContactDetail.new_Phone = null;
                _this.ContactDetail.new_IsActive = false;
                _this.senddata(_this.dup_cmpID);
                //  this.updateContactComponent( this.dup_cmpID);
            });
        }
        else {
            if (ContactDetail.new_Contact == "" || ContactDetail.new_Contact == null || ContactDetail.new_Contact == undefined) {
                this.errContactName = true;
            }
            else {
                this.errContactName = false;
            }
            if (ContactDetail.new_Phone == "" || ContactDetail.new_Phone == null || ContactDetail.new_Phone == undefined) {
                this.errContactNumber = true;
            }
            else {
                this.errContactNumber = false;
            }
        }
    };
    //to get contact info which is inserted
    contact_component.prototype.senddata = function (a) {
        var _this = this;
        this.showContactDetail = false;
        this.contactService.getAllContactDetail(a).map(function (r) { return r.json(); })
            .subscribe(function (a) {
            _this.ContactDetail.company_contact_detail = a;
        });
    };
    Object.defineProperty(contact_component.prototype, "disabledV", {
        get: function () {
            return this._disabledV;
        },
        set: function (value) {
            this._disabledV = value;
            this.disabled = this._disabledV === '1';
        },
        enumerable: true,
        configurable: true
    });
    contact_component.prototype.selected = function (value) {
        console.log('Selected value is: ', value);
    };
    contact_component.prototype.removed = function (value) {
        console.log('Removed value is: ', value);
    };
    contact_component.prototype.typed = function (value) {
        console.log('New search input: ', value);
    };
    contact_component.prototype.refreshValue = function (value) {
        this.value.text = value;
    };
    //validation
    contact_component.prototype.change_event_name = function (value) {
        if (value == '') {
            this.errContactName = true;
        }
        else {
            this.errContactName = false;
        }
    };
    contact_component.prototype.change_event_number = function (value) {
        if (value == '') {
            this.errContactNumber = true;
        }
        else {
            this.errContactNumber = false;
        }
    };
    contact_component.prototype.deleteContact = function (contact, index) {
        var _this = this;
        this.contactService.deleteContact(contact.Con_ID).
            subscribe(function (a) {
            _this.ContactDetail.company_contact_detail.splice(index, 1);
            _this.updateCompanyInfo.emit(a);
        });
    };
    __decorate([
        core_1.ViewChild(contact_contactInfo_1.contact_Info), 
        __metadata('design:type', contact_contactInfo_1.contact_Info)
    ], contact_component.prototype, "contact_info_data", void 0);
    contact_component = __decorate([
        core_1.Component({
            selector: 'contact-component',
            templateUrl: '../app/components/contact/contact.component.html',
            styleUrls: ['../app/stylesheet/contact.css'],
            directives: [contact_contactInfo_1.contact_Info, ng2_select_1.SELECT_DIRECTIVES, common_1.CORE_DIRECTIVES, customdirectives_1.NumbersOnlyDirective],
            outputs: ['updateCompanyInfo', 'getContactForparent']
        }), 
        __metadata('design:paramtypes', [contactService_1.contactService])
    ], contact_component);
    return contact_component;
}());
exports.contact_component = contact_component;
//# sourceMappingURL=contact.component.js.map