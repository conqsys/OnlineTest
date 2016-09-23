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
var angular_2_local_storage_1 = require('angular-2-local-storage');
var AppComponent = (function () {
    function AppComponent(router, localStorageService) {
        this.router = router;
        this.localStorageService = localStorageService;
        this.title = 'Online Test';
    }
    AppComponent.prototype.logout = function () {
        this.authorization = this.localStorageService.get('authorization');
        if (this.authorization) {
            this.localStorageService.remove('authorization');
            this.localStorageService.remove('user');
        }
        this.router.navigate(['/login']);
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            template: "<div class=\"col-md-12\">\n      \n          <a class=\"btn\" routerLink=\"/questions\" routerLinkActive=\"active\">Questions</a>\n          <a class=\"btn\" routerLink=\"/questionsets\" routerLinkActive=\"active\">Question Sets</a>\n          <a class=\"btn\" routerLink=\"/topiclist\" routerLinkActive=\"active\">Topic</a>\n          <a class=\"btn\" routerLink=\"/companylist\" routerLinkActive=\"active\">Companies</a>\n          <a class=\"btn\" routerLink=\"/users\" routerLinkActive=\"active\">Users</a>\n          <a class=\"btn\" routerLink=\"/onlinetestlist\" routerLinkActive=\"active\">Online Test</a>\n          <a class=\"btn\" routerLink=\"/login\" routerLinkActive=\"active\">Login</a>\n          <a class=\"btn\" (click)=logout()>Logout</a>\n\n    </div>\n    <div class=\"col-md-12\">\n    <router-outlet></router-outlet></div>",
            styleUrls: ['app.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, angular_2_local_storage_1.LocalStorageService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map