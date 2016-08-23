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
var apiurls_1 = require('../common/apiurls');
var contactService = (function () {
    function contactService(http) {
        this.http = http;
    }
    contactService.prototype.insert_Update_Contact_info = function (ContactDetail) {
        return this.http.post(apiurls_1.ApiUrls.baseUrl + 'insert_update_contact', ContactDetail);
    };
    contactService.prototype.getAllContactDetail = function (obj) {
        if (obj.cmp_ID == undefined) {
            return this.http.get(apiurls_1.ApiUrls.baseUrl + 'getAllContactDetail?Cmp_ID=' + obj.Cmp_ID);
        }
        else {
            return this.http.get(apiurls_1.ApiUrls.baseUrl + 'getAllContactDetail?Cmp_ID=' + obj.cmp_ID);
        }
    };
    contactService.prototype.deleteContact = function (Con_ID) {
        return this.http.get(apiurls_1.ApiUrls.baseUrl + 'deletecontact?Con_ID=' + Con_ID);
    };
    contactService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], contactService);
    return contactService;
}());
exports.contactService = contactService;
//   getCompany_info (Cmp_ID): any {
//     return this.http.get(ApiUrls.baseUrl+'getCompany_info?Cmp_ID='+Cmp_ID)
//   }
//# sourceMappingURL=contactService.js.map