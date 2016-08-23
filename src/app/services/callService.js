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
var CallService = (function () {
    function CallService(http) {
        this.http = http;
    }
    //   getCompany (): any {
    //     return this.http.get(ApiUrls.baseUrl+'getCompanyDetail')
    //   }
    CallService.prototype.getcallinfo = function (Call_ID) {
        return this.http.get(apiurls_1.ApiUrls.baseUrl + 'getcallinfo?Call_ID=' + Call_ID);
    };
    CallService.prototype.savecallinfodetail = function (data) {
        return this.http.post(apiurls_1.ApiUrls.baseUrl + 'savecallinfo', data);
    };
    CallService.prototype.getUpdateDetail = function (a) {
        return this.http.get(apiurls_1.ApiUrls.baseUrl + 'getcall_info_update?Cmp_ID=' + a.Cmp_ID);
    };
    CallService.prototype.deleteCall = function (Call_ID) {
        return this.http.get(apiurls_1.ApiUrls.baseUrl + 'deletecall?Call_ID=' + Call_ID);
    };
    CallService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CallService);
    return CallService;
}());
exports.CallService = CallService;
//# sourceMappingURL=callService.js.map