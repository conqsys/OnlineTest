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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var angular_2_local_storage_1 = require('angular-2-local-storage');
var base_component_1 = require('./components/base.component');
var AppComponent = (function (_super) {
    __extends(AppComponent, _super);
    function AppComponent(localStorageService, router, location) {
        _super.call(this, localStorageService, router, location);
        this.title = 'Online Test';
    }
    AppComponent.prototype.logout = function () {
        this.authorization = this.localStorageService.get('authorization');
        if (this.authorization) {
            this.localStorageService.remove('authorization');
            this.localStorageService.remove('user');
        }
        this.location.replaceState('/login');
        location.reload();
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            template: "<div class=\"col-md-12\" [hidden]=\"!user\">\n      \n          <a class=\"btn\" routerLink=\"/questions\" routerLinkActive=\"active\">Questions</a>\n          <a class=\"btn\" routerLink=\"/questionSets\" routerLinkActive=\"active\">Question Sets</a>\n          <a class=\"btn\" routerLink=\"/topics\" routerLinkActive=\"active\">Topic</a>\n          <a class=\"btn\" routerLink=\"/companies\" routerLinkActive=\"active\">Companies</a>\n          <a class=\"btn\" routerLink=\"/users\" routerLinkActive=\"active\">Users</a>\n          <a class=\"btn\" routerLink=\"/onlineTests\" routerLinkActive=\"active\">Online Test</a>\n          <a class=\"btn\" (click)=logout()>Logout</a>\n\n    </div>\n    <div class=\"col-md-12\">\n    <router-outlet></router-outlet></div>",
            styleUrls: ['app.component.css']
        }), 
        __metadata('design:paramtypes', [angular_2_local_storage_1.LocalStorageService, router_1.Router, common_1.Location])
    ], AppComponent);
    return AppComponent;
}(base_component_1.BaseComponent));
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map